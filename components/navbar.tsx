'use client'

import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { selectTotalQuantity } from "@/state/counter/selector";

export default function NavBar() {
    const totalPrice = useSelector((state: RootState) => state.price.totalPrice);
    const totalQuantity = useSelector(selectTotalQuantity);

    return (
        <div className="navbar bg-base-100 sticky top-0 z-10 bg-neutral-900 mb-10">
            <div className="flex-1">
                <a href='/' className="btn btn-ghost text-xl text-white">Saikou Kicks</a>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle hover:bg-gray-600">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            <span className="badge badge-sm indicator-item">{totalQuantity}</span>
                        </div>
                    </div>
                    <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                        <div className="card-body">
                            <span className="font-bold text-lg">{totalQuantity} Items</span>
                            <span className="text-info">Subtotal: ${totalPrice}</span>
                            <div className="card-actions">
                                <a href="/cart" className="btn btn-primary btn-block">View cart</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}