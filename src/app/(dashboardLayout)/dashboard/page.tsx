'use client'
import Statics from '@/Component/ContractorDashboard/Statics';
import PastPerformance from '@/Component/ContractorDashboard/PastPerformance';
import { useGetDashboardStatsQuery } from '@/redux/features/others/otherApi';
import { useAppSelector } from '@/redux/hooks';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';



const DashboardPage = () => {
  const user = useAppSelector(selectCurrentUser)
  const role = user?.user?.role
  const {data:dashboardStats}=useGetDashboardStatsQuery(undefined)

   
  return (
    <>
      {role ==='vipContractor' ? (
        <div className="bg-white w-full  p-4 min-h-screen flex gap-3">
          <div className="w-full">
            <Statics dashboardStats={dashboardStats}/>
            <PastPerformance dashboardStats={dashboardStats}/>
          </div>
          {/* <div className="border border-gray h-[60%] p-6 rounded-lg">
            <div className="grid grid-cols-1  gap-4">
   
              <div className="bg-gray-100 rounded-md p-4 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <p className="text-lg font-medium text-gray-800">
                    Public Profile
                  </p>
                  <Link
                    href="/contractorProfileDet"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                </div>
               
              </div>

       
             

     
      
            </div>
          </div> */}
        </div>
      ) : (
        <div className="bg-white w-full  p-4 min-h-screen">
          <Statics dashboardStats={dashboardStats}/>
          <PastPerformance dashboardStats={dashboardStats}/>
        </div>
      )}
    </>
  );
};

export default DashboardPage;
