import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import Swal from "sweetalert2";

const ShoppingCart = () => {
  const {
    isEmpty,
    cartTotal,
    totalItems,
    items,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();

  const clearCart = () => {
    Swal.fire({
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        emptyCart();
      }
    });
  };

  return (
    <div className="container my-4">
      {isEmpty ? (
        <div className="text-center py-5 border rounded">
          <p className="mb-0">Your Cart is Empty.</p>
        </div>
      ) : (
        <div className="d-flex flex-column gap-3" style={{ maxHeight: "400px", overflowY: "auto" }}>
          {items.map((item) => (
            <div
              key={item.id}
              className="d-flex align-items-center justify-content-between p-3 border rounded"
            >
              <Link to={`/foods/${item._id}`}>
                <img
                  src={`/foods/${item.thumb}`}
                  alt={item.title}
                  style={{ width: "60px", height: "60px", objectFit: "cover", marginRight : "20px" }}
                  className="img-fluid rounded"
                />
              </Link>

              <div className=" w-100 d-flex flex-column gap-2">
              <div className=" d-flex align-items-center justify-content-between mb-2 mb-md-0">
                  <Link to={`/foods/${item._id}`} className="fw-semibold text-decoration-none">
                    {item.title.slice(0, 30)}{item.title.length>30 ? "..." : ""}
                  </Link>
                  <span>Rs {item.price}</span>
              </div>
            
              <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <span className="fw-semibold">
                    Total: Rs {item.itemTotal}
                  </span>
                </div>

              </div>
             </div>
          ))}

          <div className="d-flex justify-content-between mt-4 border-top pt-3">
            <div>
              <strong>Total Items:</strong> {totalItems}
            </div>
            <div>
              <strong>Total:</strong> Rs {cartTotal}
            </div>
          </div>

          <div className="d-flex justify-content-between mt-3">
            <Link to="/orders" className="btn btn-warning">
              Confirm Order
            </Link>
            <button className="btn btn-danger" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
