import AuthenticatorChecker from "@/components/Checkers/AuthenticatorChecker";
import DistributorChecker from "@/components/Checkers/DistributorChecker";
import DistributorSideBar from "@/components/Distributor/DistributorSideBar";
import OrdersView from "@/components/Distributor/OrdersView";
import React from "react";

const Orders = () => {

    return (
        <AuthenticatorChecker>
            <DistributorChecker>
                <div style={{display: 'flex', width: '100vw', height: '100vh', overflow: 'clip'}}>
                    <DistributorSideBar />
                    <OrdersView />
                </div>
            </DistributorChecker>
        </AuthenticatorChecker>
    )

}

export default Orders;