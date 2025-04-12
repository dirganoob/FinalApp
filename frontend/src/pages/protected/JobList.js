import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import JobList from '../../features/JobList'



function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Lowongan"}))
      }, [])


    return(
        <JobList />
    )
}

export default InternalPage