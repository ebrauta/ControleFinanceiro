const { createApp } = Vue
    createApp({
      name: 'App',
      data() {
        return {
          title: "Controle de Despesas",
          balance: 0,
          income: 0,
          expense: 0,
          transactionsArray: [],
          actualTransaction: {
            name: "",
            amount: null
          }
        }
      },
      computed: {
        balanceInMoney() {
          return Number(this.balance).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        },
        incomeInMoney(){
          return Number(this.income).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        },
        expenseInMoney(){
          return Number(this.expense).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        },
      },
      methods: {
        transactionInMoney(value){
          return Math.abs(value).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
        },
        totalValue(){
          this.income = this.transactionsArray.reduce((acc, transaction) => {
            return acc += (transaction.amount > 0) ? transaction.amount : 0
          },0)
          this.expense = this.transactionsArray.reduce((acc, transaction) => {
            return acc += (transaction.amount < 0) ? transaction.amount : 0
          },0)
          this.balance = this.income + this.expense
        },
        addTransaction(){
          let id = { id: this.transactionsArray.length + 1 }
          let transaction = { ...id, ...this.actualTransaction }
          this.transactionsArray.push(transaction)
          console.log("transação adicionada!")
          this.totalValue()
          this.actualTransaction.name = ""
          this.actualTransaction.amount = null
        },
        removeTransaction(id){
          this.transactionsArray = this.transactionsArray.filter(t => t.id !== id)
          console.log("transação removida!")
          this.totalValue()
        }
      }
    }).mount("#app")