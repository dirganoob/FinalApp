import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../features/common/headerSlice';
import { Link } from 'react-router-dom';
import TemplatePointers from '../../features/user/components/TemplatePointers';

function InternalPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle({ title: '' }));
    }, []);

    return (
        <div className="hero min-h-screen bg-base-200 flex items-center justify-center">
            <div className="hero-content w-full max-w-4xl flex flex-col items-center space-y-8 p-8 bg-white shadow-lg rounded-lg">
                <TemplatePointers />
                <Link to="/app/JobList">
                    <button className="btn w-full max-w-xs bg-teal-600 hover:bg-teal-700 text-white btn-outline">
                        Get Started
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default InternalPage;
