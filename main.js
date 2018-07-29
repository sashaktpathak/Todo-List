window.onload = function () {
    let todos = []
    
    let list = this.document.getElementById('list')
    let newtask = this.document.getElementById('input-todo')
    let addtask = this.document.getElementById('btn-add')
    let cleardone = this.document.getElementById('btn-clear')
    let sortlist = this.document.getElementById('sortlist')

    function retrieveTodos () {
        if (localStorage['todos']) {
            todos = JSON.parse(localStorage['todos'])
        }
    }
    function saveTodos () {
        localStorage['todos'] = JSON.stringify(todos)
    }
    function clearList () {
        while(list.firstChild) {
            list.removeChild(list.firstChild)
        }
    }
    newtask.addEventListener("keydown",function(event)
    {
        //event.preventDefault();
        if(event.keyCode === 13)
        {
            document.getElementById('btn-add').click();
        }
    });
    window.addEventListener("keydown",function(event)
    {
        //event.preventDefault();
        var key = event.keyCode || event.charCode 
        if(key == 46)
        {
            document.getElementById('btn-clear').click();
        }
    });
    function createListItemFromTodo(todo, pos) {
        let item = document.createElement('li')
        let taskSpan = document.createElement('span')
        let countDown = document.createElement('button')
        let xBtn = document.createElement('button')
        let upBtn = document.createElement('button')
        let downBtn = document.createElement('button')
        let rpt = document.createElement('button')
        let anotherdiv = document.createElement('div')
        let badge_number = document.createElement('span')
        badge_number.classList.add('badge')
        badge_number.classList.add('badge-light')
        anotherdiv.appendChild(countDown);
        anotherdiv.appendChild(rpt);
        anotherdiv.appendChild(xBtn);
        anotherdiv.appendChild(upBtn);
        anotherdiv.appendChild(downBtn);
        anotherdiv.classList.add('btn-group');
        countDown.classList.add('btn')
        xBtn.classList.add('btn');
        upBtn.classList.add('btn');
        downBtn.classList.add('btn');
        rpt.classList.add('btn');
        rpt.classList.add('repeat');
        countDown.classList.add('countDown')
        countDown.classList.add('btn-outline-dark');
        xBtn.classList.add('btn-outline-primary');
        upBtn.classList.add('btn-outline-primary');
        downBtn.classList.add('btn-outline-primary');
        rpt.classList.add('btn-outline-danger');
        item.classList.add('list-group-item');
        item.style.width = "60%"
        item.style.minWidth ="400px"
        item.style.display="flex"
        item.style.flexDirection="row"
        item.style.justifyContent="space-between"
        taskSpan.classList.add('list_item_style')
        taskSpan.innerText = todo.task
        countDown.innerHTML = '<i class="material-icons"> keyboard_arrow_down</i>'
        xBtn.innerHTML = '<i class="material-icons">done</i>'
        upBtn.innerHTML = '<i class="material-icons">arrow_upward</i>'
        downBtn.innerHTML = '<i class="material-icons">arrow_downward</i>'
        rpt.innerHTML = '<i class="material-icons">repeat</i>'
        if(todo.done)
            xBtn.innerHTML = '<i class="material-icons">remove</i>'
        else
            xBtn.innerHTML = '<i class="material-icons">done</i>' 
        badge_number.innerText = todo.count + 1
        if (todo.done) {
            taskSpan.style.textDecoration = 'line-through'
        }
        countDown.onclick = function()
        {
            if(todo.count!=0)
            todo.count--;
            saveTodos()
            refreshList()
        }
        rpt.onclick =function()
        {
            todo.count++;
            saveTodos()
            refreshList()
        }
        xBtn.onclick = function () {
            todos[pos].done = !todos[pos].done
            saveTodos()
            refreshList()
        }
        downBtn.onclick = function () {
            if (pos >= todos.length - 1) return

            todos.splice(pos, 0, todos.splice(pos+1, 1)[0])
            saveTodos()
            refreshList()
        }
        upBtn.onclick = function () {
            if (pos <= 0) return
            
            todos.splice(pos-1, 0, todos.splice(pos, 1)[0])
            saveTodos()
            refreshList()
        }
        item.setAttribute('data-id', pos)
        if(todo.count!=0)
            taskSpan.appendChild(badge_number)
        item.appendChild(taskSpan)
        item.appendChild(anotherdiv);
        /* item.appendChild(xBtn)
        item.appendChild(upBtn)
        item.appendChild(downBtn) */
        return item
    }
    function refreshList () {
        retrieveTodos()
        clearList()
        for (let i = 0; i < todos.length; i++) {
            list.appendChild(createListItemFromTodo(todos[i], i))
        }
    }
    function addTodo () {
        console.log("flag1")
        if(find(todos,newtask.value)==-1)
        {
            console.log("flag2")
            todos.push({
                task: newtask.value,
                done: false,
                count: 0
            })
        }
        saveTodos()
        newtask.value = ""
        refreshList()
    }

    addtask.onclick = addTodo
    cleardone.onclick = function () {
        todos = todos.filter((t) => !t.done)
        saveTodos()
        refreshList()
    }
    sortlist.onclick = function () {
        console.log('flag3')
        todos.sort((a,b) => a.done - b.done)
        saveTodos()
        refreshList()
    }
    function find(todos1,name)
    {
        let ret = -1;
        for (let i = 0; i < todos1.length; i++) {
            if(name == todos1[i].task)
            {
                todos1[i].count++;
                ret = todos[i].count;
            }
        }
        return ret;
    }
    refreshList()


}