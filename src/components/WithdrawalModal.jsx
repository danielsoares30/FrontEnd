import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const WithdrawalModal = ({ balance, isOpen, onClose, onConfirm }) => {
    // Estado para o valor que o usuário deseja sacar
    const [amount, setAmount] = useState('');
    // Estado para a mensagem de erro
    const [error, setError] = useState('');

    const maxAmount = parseFloat(balance.replace('R$', '').replace('.', '').replace(',', '.'));

    const handleWithdraw = () => {
        const withdrawAmount = parseFloat(amount);
        
        setError('');

        if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
            setError('Por favor, insira um valor válido.');
            return;
        }

        if (withdrawAmount > maxAmount) {
            setError('Saldo insuficiente. O valor máximo para saque é R$ ' + balance);
            return;
        }

        if (withdrawAmount < 10.00) { // Exemplo de valor mínimo
            setError('O valor mínimo para saque é R$ 10,00.');
            return;
        }

        // Chama a função de confirmação no componente pai
        onConfirm(withdrawAmount);

        // Reseta o estado
        setAmount('');
        onClose(); 
    };
    
    // Variantes para a animação do modal
    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
        exit: { opacity: 0, scale: 0.8 }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="modal-backdrop" onClick={onClose}>
                    <motion.div 
                        className="withdrawal-modal" 
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={e => e.stopPropagation()} // Impede que o clique interno feche o modal
                    >
                        <button className="modal-close-button" onClick={onClose}>&times;</button>
                        
                        <h2>Sacar Saldo</h2>
                        <p className="modal-balance-info">
                            Seu saldo disponível é de <span className="highlight-balance">R$ {balance}</span>.
                        </p>

                        <div className="form-group">
                            <label htmlFor="amount">Valor do Saque (R$)</label>
                            <input
                                id="amount"
                                type="number"
                                placeholder="Ex: 500.00"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className={error ? 'input-error' : ''}
                            />
                            {error && <p className="error-message">{error}</p>}
                        </div>

                        <div className="modal-actions">
                            <button className="btn-cancel" onClick={onClose}>Cancelar</button>
                            <button 
                                className="btn-confirm" 
                                onClick={handleWithdraw}
                                disabled={!amount || error}
                            >
                                Confirmar Saque
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default WithdrawalModal;