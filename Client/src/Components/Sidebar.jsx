export default function (){
    return(
        <div>
            <div className="w-64 bg-white shadow-lg p-4 h-full">
                <h2 className="text-xl font-bold mb-4">Menu</h2>
                    <nav className="flex flex-col gap-2">
                        <NavLink to="/feed" className="hover:underline">Dashboard</NavLink>
                        <NavLink to="/feed/all" className="hover:underline">All Jobs</NavLink>
                        <NavLink to="/feed/applications" className="hover:underline">My Applications</NavLink>
                        <NavLink to="/feed/users" className="hover:underline">Users</NavLink>
                        <NavLink to="/feed/about" className="hover:underline">About</NavLink>
                    </nav>
            </div>
        </div>
    )
}