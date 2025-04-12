import requests
import json
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import LabelEncoder
import matplotlib.pyplot as plt
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# === 1. Ambil Data dari JobStreet ===
base_url = "https://id.jobstreet.com/api/jobsearch/v5/search?siteKey=ID-Main&sourcesystem=houston&facets=title&where=Sulawesi+Selatan&pageSize=100&include=seodata,relatedsearches,joracrosslink,gptTargeting&locale=id-ID"

# Mengumpulkan data dari beberapa halaman
jobs_data = []
for page in range(1, 6):  # Ambil 5 halaman pertama
    url = f"{base_url}&page={page}"
    response = requests.get(url)
    if response.status_code == 200:
        data = json.loads(response.content)
        for job in data["data"]:
            job_dict = {
                "Company": job.get("companyName", ""),
                "Job": job["title"],
                "Listing Date": job["listingDateDisplay"],
                "Location": job["locations"][0]["label"],
                "Work Type": job["workTypes"][0],
                "Teaser Job": job["teaser"],
                "Job ID": job["id"],
                "Classification": job["classifications"][0]["classification"]["description"],
                "Sub Classification": job["classifications"][0]["subclassification"]["description"],
                "Job_URL": f"https://id.jobstreet.com/id/job/{job['id']}",  
            }
            jobs_data.append(job_dict)
    else:
        print(f"Error: Gagal mengambil data halaman {page}. Status code: {response.status_code}")

# Simpan ke DataFrame
df = pd.DataFrame(jobs_data)

# === 2. Encoding Kolom Classification ===
le = LabelEncoder()
df['Classification_encoded'] = le.fit_transform(df['Classification'])

# === 3. Plot Elbow Method ===
def plot_elbow_method(features):
    distortions = []
    K = range(2, 7)  # Coba jumlah cluster dari 2 sampai 6
    for k in K:
        kmeans = KMeans(n_clusters=k, random_state=42)
        kmeans.fit(features)
        distortions.append(kmeans.inertia_)

    # Plot hasil Elbow
    plt.figure(figsize=(8, 5))
    plt.plot(K, distortions, 'bo-')
    plt.xlabel('Jumlah Cluster (k)')
    plt.ylabel('WCSS (Within-Cluster Sum of Squares)')
    plt.title('Metode Elbow untuk Menentukan Jumlah Cluster Optimal')
    plt.xticks(K)
    plt.grid()
    plt.show()

    return distortions

# === 4. Clustering dengan K-Means ===
def perform_clustering(df):
    if df is not None and not df.empty:
        features = df[['Classification_encoded']]

        # Plot Elbow Method
        distortions = plot_elbow_method(features)

        # Menentukan jumlah cluster optimal (gunakan siku dari elbow method)
        optimal_k = 3  # Bisa diganti sesuai grafik yang dihasilkan
        print(f"Jumlah cluster optimal: {optimal_k}")

        # Clustering dengan K-Means
        kmeans = KMeans(n_clusters=optimal_k, random_state=42)
        df['Cluster'] = kmeans.fit_predict(features)

        # Urutkan berdasarkan Classification lalu Cluster
        df_sorted = df.sort_values(by=['Classification', 'Cluster'])

        # Simpan ke CSV dan Excel
        df_sorted.to_csv('job_data_with_clusters.csv', index=False)
        df_sorted.to_excel('job_data_with_clusters.xlsx', index=False)
        print("Clustering selesai, hasil disimpan dalam file CSV dan Excel.")
    else:
        print("DataFrame kosong, clustering dibatalkan.")
        
def calculate_job_fit_score(user_skills):
    df_jobs = pd.read_csv('job_data_with_clusters.csv')

    # Gabungkan deskripsi pekerjaan untuk perhitungan kecocokan
    df_jobs['job_desc_combined'] = df_jobs['Job'] + " " + df_jobs['Teaser Job'] + " " + df_jobs['Classification']

    # TF-IDF untuk vektorisasi teks
    vectorizer = TfidfVectorizer()
    job_vectors = vectorizer.fit_transform(df_jobs['job_desc_combined'])
    user_vector = vectorizer.transform([user_skills])

    # Hitung cosine similarity
    similarity_scores = cosine_similarity(user_vector, job_vectors).flatten()

    # Tambahkan skor ke DataFrame
    df_jobs['Job Fit Score'] = (similarity_scores * 100).round(2)

    # Urutkan berdasarkan skor kecocokan
    df_jobs = df_jobs.sort_values(by='Job Fit Score', ascending=False)

    return df_jobs[['Job', 'Company', 'Location', 'Job Fit Score', 'Job_URL']].to_dict(orient='records')


# Jalankan Clustering
perform_clustering(df)
