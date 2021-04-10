import React, { useEffect, useState, FormEvent } from "react";
import { ButtonAction, ButtonSearch, Container, ContainerModal, ContainerSelect, ButtonClearFilter } from "./styles";
import Modal from 'react-modal';
import { api } from '../../services/api';
import closeImg from '../../assets/close.svg';
import moment from 'moment';
import { notify } from "react-notify-toast";

interface TransactionsProps{
    _id: number,
    user_id: number,
    motivo_divida: string,
    valor: number,
    data_divida: Date
}

interface Users {
    id: number,
    name: string,
}

export function TransactionsTable(){
    const [transactions, setTransactions] = useState<TransactionsProps[]>([]);
    const [idTransaction, setIdTransaction] = useState(0);
    const [selectValueFilter, setSelectValueFilter] = useState(1);
    const [modalFuncao, setModalFuncao] = useState('');
    const [usuarios, setUsuarios] = useState<Users[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [user_id, setUserid] = useState(1);
    const [motivo_divida, setMotivoDivida] = useState('');
    const [data_divida, setDataDivida] = useState('');
    const [valor, setValor] = useState(0);

    useEffect(() => {
        loadDividas();
        loadClients();
    },[])

   async function loadClients(){
       await api.get('https://jsonplaceholder.typicode.com/users').then( response =>{
        setUsuarios(response.data);
           
        });
    }

    async function loadDividas() {
        await api.get('/dividas').then( response =>{
            setTransactions(response.data.dividas);
        });
    }

    function notifyToast(status: string, messageNotify: string){

            var background = "";

            if(status == 'sucesso'){
                var background = '#33CC95';
            }
            else if(status == 'error'){
                var background = '#E52E4D';
            }

            let myColor = { background: background, text:  "#FFFFFF" };
            notify.show(messageNotify, "custom", 3000, myColor);
    }

     function handleSearchTransactions(){
        api.get(`divida/user/${selectValueFilter}`)
        .then(response =>{
            const transactionFiltered = response.data.dividas;
            setTransactions(transactionFiltered);
        });     
    }

    function handleOpenModal(){
        setModalOpen(true);
        setModalFuncao('create');
        setUserid(1);
        setMotivoDivida('');
        setDataDivida('');
        setValor(0);   
    }
    function handleOpenModalWithTransaction (props: any){
        setModalFuncao('update')
        setModalOpen(true);
        setIdTransaction(props._id);
        setUserid(props.user_id);
        setMotivoDivida(props.motivo_divida);
        setDataDivida(moment(props.data_divida).format('YYYY-MM-DD'));
        setValor(props.valor);
        
    }
    function handleOpenModalView(props: any){

        setModalFuncao('view')
        setModalOpen(true);
        setIdTransaction(props._id);
        setUserid(props.user_id);
        setMotivoDivida(props.motivo_divida);
        setDataDivida(moment(props.data_divida).format('YYYY-MM-DD'));
        setValor(props.valor);

    } 

    function handleCloseModal(){
        setModalOpen(false);
    }

    function handleUpdateTransaction(event: FormEvent){
        event.preventDefault();

        const data = {
            user_id,
            valor,
            data_divida,
            motivo_divida
        }

        api.put(`divida/${idTransaction}`, data)
        .then( response =>{
            if(!response.data.error){
                handleCloseModal();
                loadDividas();
                notifyToast('sucesso', 'Dívida Alterada com sucesso');
            }
        })
    }
    function handleCreateNewTransaction(event: FormEvent){
        event.preventDefault();

        const data = {
            user_id,
            motivo_divida,
            data_divida,
            valor
        }
         api.post('divida', data)
          .then(response =>{   
            setUserid(1);
            setMotivoDivida('');
            setDataDivida('');
            setValor(0);
            loadDividas();
            handleCloseModal();
            notifyToast('sucesso', 'Dívida Cadastrada com sucesso');

        }).catch( err =>{
            notifyToast('error', 'Preencha todos os campos')     
        });
    
    }

    function handleRemoveTransaction(id: number){
        api.delete(`divida/${id}`)
        .then( response => {
            loadDividas();
            notifyToast('sucesso', 'Dívida Removida com sucesso')
        });
    }

    return(

        <Container>    
            <ContainerSelect>
                <div>
                        <span>
                            Limpar Filtro 
                            <ButtonClearFilter onClick={loadDividas}>
                                <i className="fas fa-trash"></i>
                            </ButtonClearFilter>
                        </span>
                        <select value={selectValueFilter} onChange={event => setSelectValueFilter(Number(event.target.value))}>
                            {
                                usuarios.map(usuario =>(
                                    <option key={usuario.id} value={usuario.id}>
                                        {usuario.name}
                                    </option>
                                ))
                            }
                        </select>

                        <ButtonSearch onClick={handleSearchTransactions}>
                            <i className="fas fa-search"></i>
                        </ButtonSearch>
                </div>

                        <button type="button" onClick={handleOpenModal}>
                            Nova Dívida
                        </button>

            </ContainerSelect>
            <table>
                <thead>
                   <tr>
                    <th>Cliente</th>
                    <th>Motivo da Divida</th>
                    <th>Valor</th>
                    <th>Data</th>
                    <th>Visualizar</th>
                    <th>Editar</th>
                    <th>Remover</th>
                   </tr> 
                </thead>


                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction._id}>
                            <td>{transaction.user_id}</td>
                            <td >{transaction.motivo_divida}</td>
                            <td>
                                {new Intl.NumberFormat('pt-BR',
                                 { style: 'currency', currency: 'BRL' })
                                 .format(transaction.valor)
                                }
                            </td>
                            <td>
                                {moment(transaction.data_divida).format('DD/MM/YYYY')}
                            </td>
                            <td><ButtonAction onClick={() => handleOpenModalView(transaction)}><i className="fas fa-eye"></i></ButtonAction></td>
                            <td><ButtonAction onClick={() => handleOpenModalWithTransaction(transaction)}><i className="fas fa-edit"></i></ButtonAction></td>
                            <td><ButtonAction onClick={() => handleRemoveTransaction(transaction._id)}><i className="fas fa-trash"></i></ButtonAction></td>
                        </tr>
                    ))}
                  
                </tbody>
            </table>

        <Modal 
        isOpen={modalOpen}
        onRequestClose={handleCloseModal}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        >

        <button type="button">
            <img 
             src={closeImg}
             alt="Fechar Modal" 
             onClick={handleCloseModal}
             className="react-modal-close"
              />
        </button>

        <ContainerModal onSubmit={modalFuncao == 'create' ? handleCreateNewTransaction : handleUpdateTransaction}>

            <h2>{modalFuncao == 'create' ? 'Cadastrar Dívida' : 'Dívida'}</h2>
                                
            <select 
                value={user_id}
                disabled={modalFuncao == 'view'}
                onChange={event => setUserid(Number(event.target.value))}
                >
                {
                usuarios.map(usuario =>(
                    <option key={usuario.id} value={usuario.id}>
                        {usuario.name}
                    </option>
                    ))
                }
            </select>

            <input
            type="text"
            placeholder="Motivo"
            disabled={modalFuncao == 'view'}
            value={motivo_divida}
            onChange={event => setMotivoDivida(event.target.value)}
            />

            <input
            type="date"
            placeholder="Data da divida"
            disabled={modalFuncao == 'view'}
            value={data_divida}
            onChange={event => setDataDivida(event.target.value)}
            />

            <input
            type="number"
            disabled={modalFuncao == 'view'}
            placeholder="Valor"
            value={valor}
            onChange={event => setValor(Number(event.target.value))}
            />
            
            <button type="submit" hidden={modalFuncao == 'view'} >
                {modalFuncao == 'create' ? 'Cadastrar' : 'Editar'}
            </button>

        </ContainerModal>
            
        </Modal>

    </Container>

        

    );
}