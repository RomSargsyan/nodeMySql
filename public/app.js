new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data() {
    return {
      show: true,
      todoTitle: '',
      todos: []
    }
  },
  methods: {
    addTodo() {
      const title = this.todoTitle.trim();
      const query = `
        mutation {
          addTodo(todo: {title: "${title}"}) {
            id title done createdAt updatedAt
          }
        }
      `
      
      if (!title) {
        return
      }
      fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({query})
      })
        .then(res => res.json())
        .then((response) => {
          this.todos.push(response.data.addTodo)
          this.todoTitle = ''
        })
        .catch(e => console.log(e))
    },
    removeTodo(id) {
      const query = `
        query {
          removeTodo(id: "${id}")
        }
      `

      fetch('/graphql', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({query}) 
      })
      .then(res => res.json)
      .then(() => {
        this.todos = this.todos.filter((t) => t.id !== id);
      })
    },
    completeTodo(id) {
      const query = `
        query {
          updateTodo(id: "${id}") {
            done id updatedAt title
          }
        }
      `

      fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body:  JSON.stringify({query})
      })
      .then(res => res.json())
      .then((response) => {
        const idx = this.todos.findIndex(t => t.id === response.data.updateTodo.id)
        this.todos[idx].updatedAt = response.data.updateTodo.updatedAt
      })
      .catch(err => console.log(err))
    }
  },
  filters: {
    capitalize(value) {
      return value.toString().charAt(0).toUpperCase() + value.slice(1);
    },
    date(value) {
      return new Intl.DateTimeFormat('en-En', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
      }).format(new Date(+value));
    }
  },
  created() {
    this.$vuetify.theme.dark = true;
    const query = `
      query {
        getTodos {
          title id done createdAt updatedAt
        }
      } 
        
    `

    fetch('/graphql', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({query: query}) 
    })
    .then(res => res.json())
    .then(({data}) => {
      this.todos = data.getTodos
    })
    .catch(err => console.log(err))
  },
});