import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import styles from "./Cart.module.css";
import { useAppContext } from "../../context/AppContext";
import { cartItem } from "../../types";
import { useNavigate } from "react-router";

const Cart: React.FC = () => {
  const { cart, setCart } = useAppContext();
  const [products, setProducts] = useState<cartItem[]>([]);
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">("delivery");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setProducts(cart);
  }, [cart]);

  const handleQuantityChange = (id: string, change: number) => {
    const itemIndex = cart.findIndex(item => item.product.id === id);
    if (itemIndex === -1) return;

    const newQuantity = cart[itemIndex].quantity + change;
    if (newQuantity < 1) return;

    const updatedCart = [...cart];
    updatedCart[itemIndex] = { ...updatedCart[itemIndex], quantity: newQuantity };
    setCart(updatedCart);
  };

  const removeItem = (id: string) => {
    const item = cart.find((item) => item.product.id === id);
    if (!item) return;

    Swal.fire({
      title: "Remover produto?",
      text: `Deseja remover "${item.product.name}" do carrinho?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, remover",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "var(--secondary-color)",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        setCart(cart.filter(item => item.product.id !== id));

        Swal.fire({
          icon: "success",
          title: "Removido!",
          text: "Produto removido com sucesso.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  // const toggleSaveForLater = () => {
  //   Swal.fire({
  //     icon: "info",
  //     title: "Salvar para depois",
  //     text: `Função de salvar para depois ainda não implementada.`,
  //   });
  // };

  const applyCoupon = () => {
    if (couponCode.trim()) {
      setAppliedCoupon(true);
      Swal.fire({
        icon: "success",
        title: "Cupom aplicado!",
        text: `Cupom "${couponCode}" aplicado com sucesso.`,
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(false);
    setCouponCode("");
    // Swal.fire({
    //   icon: "info",
    //   title: "Cupom removido",
    //   text: "O cupom foi removido.",
    //   timer: 1500,
    //   showConfirmButton: false,
    // });
  };

  const calculateTotals = () => {
    const subtotal = products.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const discount = appliedCoupon ? subtotal * 0.4 : 0;
    const delivery = deliveryMethod === "delivery" ? 1.99 : 0;
    const taxes = subtotal * 0.05;
    const total = subtotal - discount + delivery + taxes;

    return { subtotal, discount, delivery, taxes, total };
  };

  const { subtotal, discount, delivery, taxes, total } = calculateTotals();
  const totalItems = products.reduce((acc, item) => acc + item.quantity, 0);

  const estimatedDeliveryDate = new Date();
  estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 3);

  return (
    <div className={styles.container}>
      {totalItems === 0 ? (
        <div className={styles.emptyCart}>
          <h2>Seu carrinho está vazio</h2>
          <p>Parece que você ainda não adicionou nenhum item ao carrinho.</p>
          <button className={styles.continueShopping} onClick={()=> navigate("/")}>CONTINUAR COMPRANDO</button>
        </div>
      ) : (
        <>
          <div className={styles.cartSection}>
            <div className={styles.header}>
              <h1>Carrinho ({totalItems} {totalItems === 1 ? 'item' : 'itens'})</h1>
              {products.length > 0 && (
                <button className={styles.clearCart} onClick={() => {
                  Swal.fire({
                    title: "Limpar carrinho?",
                    text: "Você tem certeza que deseja remover todos os itens?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Sim, limpar",
                    cancelButtonText: "Cancelar",
                    confirmButtonColor: "var(--secondary-color)",
                    cancelButtonColor: "#d33",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      setCart([]);
                      Swal.fire({
                        icon: "success",
                        title: "Carrinho limpo!",
                        timer: 1500,
                        showConfirmButton: false,
                      });
                    }
                  });
                }}>
                  Limpar carrinho
                </button>
              )}
            </div>

            <div className={styles.cartItems}>
              {products.map((item) => (
                <div key={item.product.id} className={styles.cartItem}>
                  <div className={styles.itemImage}  onClick={()=> navigate(`/product/${item.product.id}`)}>
                    <img src={item.product.image} alt={item.product.name} />
                  </div>
                  <div className={styles.itemInfo}>
                    <div className={styles.itemHeader}>
                      <h3  onClick={()=> navigate(`/product/${item.product.id}`)}>{item.product.name}</h3>
                      <span className={styles.itemPrice}>R$ {(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <p className={styles.itemDescription}>{item.product.description || "Produto de alta qualidade"}</p>
                    <div className={styles.actions}>
                      <div className={styles.quantityControl}>
                        <button 
                          onClick={() => handleQuantityChange(item.product.id, -1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(item.product.id, 1)}>
                          +
                        </button>
                      </div>
                      <div className={styles.saveDelete}>
                        <button>
                          ❤️ Salvar para depois
                        </button>
                        <button onClick={() => removeItem(item.product.id)}>
                          🗑 Remover
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.deliverySummary}>
            <div className={styles.summaryCard}>
              <h2>Resumo do Pedido</h2>

              <div className={styles.deliveryOptions}>
                <h3>Opções de Entrega</h3>
                <div className={styles.deliveryToggle}>
                  <button 
                    className={deliveryMethod === "delivery" ? styles.active : ""}
                    onClick={() => setDeliveryMethod("delivery")}
                  >
                    🚚 Entregar no endereço
                  </button>
                  <button 
                    className={deliveryMethod === "pickup" ? styles.active : ""}
                    onClick={() => setDeliveryMethod("pickup")}
                  >
                    🏪 Retirar na loja
                  </button>
                </div>

                {deliveryMethod === "delivery" && (
                  <p className={styles.deliveryEstimate}>
                    Entrega prevista para: <strong>{estimatedDeliveryDate.toLocaleDateString('pt-BR')}</strong>
                  </p>
                )}
              </div>

              <div className={styles.couponSection}>
                <h3>Cupom de Desconto</h3>
                {appliedCoupon ? (
                  <div className={styles.couponApplied}>
                    <span>Cupom "{couponCode}" aplicado!</span>
                    <button onClick={removeCoupon}>Remover</button>
                  </div>
                ) : (
                  <div className={styles.couponInputGroup}>
                    <input
                      type="text"
                      placeholder="Digite seu cupom"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button onClick={applyCoupon}>Aplicar</button>
                  </div>
                )}
              </div>

              <div className={styles.summary}>
                <div className={styles.summaryRow}>
                  <span>Subtotal ({totalItems} itens)</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Desconto</span>
                  <span className={styles.discount}>- R$ {discount.toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>{deliveryMethod === "delivery" ? "Entrega" : "Retirada"}</span>
                  <span>{delivery > 0 ? `R$ ${delivery.toFixed(2)}` : "Grátis"}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Impostos</span>
                  <span>R$ {taxes.toFixed(2)}</span>
                </div>
                <div className={styles.summaryTotal}>
                  <span>Total</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                className={styles.confirmButton}
                onClick={() =>
                  Swal.fire({
                    icon: "success",
                    title: "Compra finalizada!",
                    text: "Obrigado pela sua compra 💖",
                  })
                }
              >
                FINALIZAR COMPRA
              </button>
              <button className={styles.backButton} onClick={()=> navigate("/")}>CONTINUAR COMPRANDO</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
