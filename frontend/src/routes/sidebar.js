import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
// import CalendarDaysIcon from '@heroicons/react/24/outline/CalendarDaysIcon'
import BoltIcon from '@heroicons/react/24/outline/BoltIcon'
import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';



const iconClasses = `h-6 w-6`


const routes = [

  {
    path: '/app/dashboard',
    icon: <Squares2X2Icon className={iconClasses}/>, 
    name: 'Dashboard',
  },
  // {
  //   path: '/app/leads', // url
  //   icon: <InboxArrowDownIcon className={iconClasses}/>, // icon component
  //   name: 'Leads', // name that appear in Sidebar
  // },
  // {
  //   path: '/app/transactions', // url
  //   icon: <CurrencyDollarIcon className={iconClasses}/>, // icon component
  //   name: 'Notifikasi', // name that appear in Sidebar
  // },
  // {
  //   path: '/app/charts', // url
  //   icon: <ChartBarIcon className={iconClasses}/>, // icon component
  //   name: 'Profil', // name that appear in Sidebar
  // },
  {
    path: '/app/integration', // url
    icon: <BoltIcon className={iconClasses}/>, // icon component
    name: 'Lamaran', // name that appear in Sidebar
  },
  {
    path: '/app/JobList', // url
    icon: <MagnifyingGlassIcon className={iconClasses}/>, // icon component
    name: 'Lowongan', // name that appear in Sidebar
  },



  
]

export default routes


