"use client";
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@clerk/nextjs"
import { dataAdminSidebar, dataGeneralSidebar } from "./SidebarRoutes.data";
import { SidebarItem } from "./SidebarItem";
import { isAdmin } from "@/lib/isAdmin";

export  function SidebarRoutes() {
    const { userId } = useAuth();

  return (
    <div className="flex flex-col justify-between h-full">
        <div >
            <div className="p-2 md:p-8 text-2xl ">
              <p className="mb-3 text-slate-500 text-xl">GENERAL</p>
              <div className="font-bold">
              {dataGeneralSidebar.map((item) =>  (
                <SidebarItem key={item.label} item={item}/>
             ))}
              </div>
            </div>

            <Separator/>

            {isAdmin(userId) && (
              <div className="p-2 md:p-8 text-2xl">
              <p className="mb-3 text-slate-500 text-xl">ADMINISTRADOR</p>
              <div className="font-bold">
              {dataAdminSidebar.map((item) => (
                <SidebarItem key={item.label} item={item} />
              ))}
              </div>
            </div>
            )}
            
          </div>

          <div>  
            <Separator/>

            <footer className="p-3 mt-3 text-center">
              2024. Todo los derechos reservados
            </footer>
          </div>
    </div>
  );
}
