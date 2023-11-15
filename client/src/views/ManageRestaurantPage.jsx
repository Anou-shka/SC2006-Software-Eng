import { NavLink } from "react-router-dom";

const ManageRestaurantPage = () => {
    // if (!restaurant) {
    //     // Handle the case when 'restaurant' is undefined
    //     return <p>Loading...</p>; // or any other appropriate action
    //   }
    return(
        <>
    <div className="container w-50 my-3">
        <h2 className="mb-4">Restaurant Details</h2>
        <div className="card bg-light py-4 px-5 mb-3">
            <div className="profile-row d-flex">
                <div className="col-4">
                    Restaurant Name
                </div>
                <div className="col-6 ps-3">
                    {/* {restaurant.name} */}
                    Dian Xiao Er
                </div>
            </div>
            <div className="profile-row d-flex">
                <div className="col-4">
                    Description
                </div>
                <div className="col-6 ps-3">
                    {/* {restaurant.description} */}
                    Chinese Restaurant
                </div>
            </div>
            <div className="profile-row d-flex">
                <div className="col-4">
                    Address
                </div>
                <div className="col-6 ps-3">
                    {/* {restaurant.address} */}
                    1 Jurong West Central 2
                </div>
            </div>
            <div className="profile-row d-flex">
                <div className="col-4">
                    Email
                </div>
                <div className="col-6 ps-3">
                    {/* {restaurant.email} */}
                    dianxiaoer@example.com
                </div>
            </div>
            <div className="profile-row d-flex">
                <div className="col-4">
                    Contact Number
                </div>
                <div className="col-6 ps-3">
                    {/* {restaurant.contactNumber} */}
                    6265 4428
                </div>
            </div>
            <div className="profile-row d-flex">
                <div className="col-4">
                    Timings
                </div>
                <div className="col-6 ps-3">
                    {/* {restaurant.timings} */}
                    10am - 10pm
                </div>
            </div>
        </div>
        <NavLink className="btn btn-primary" to="../restaurant/profile">Update</NavLink>
    </div>
    </>
    )
}

export default ManageRestaurantPage;