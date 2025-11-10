const inpt = document.getElementById('inpt');
const addBtn = document.getElementById('add-btn');
const tasksCont = document.getElementById('tasks-cont');

addBtn.addEventListener('click', createTask)
document.addEventListener('keydown', (e) => {
    if (e.key == "Enter") {
        if (String(inpt.value).trim() != '') {
            createTask()
        }
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key == 'Enter' && e.ctrlKey == true) {
        document.querySelectorAll('.new-text').forEach((e) => {
            new_text = properCase([...document.querySelectorAll('.new-text')].reverse()[Number(index)].innerHTML);
            e.contentEditable = false;
            for (const arrElement of arr) {
                if (arrElement.task == old_text) {
                    let temp_arr = [...arr];
                    temp_arr.splice(temp_arr.indexOf(arrElement),1);
                    console.log(temp_arr, new_text)
                    for(const ar of temp_arr){
                        if(ar.task == new_text){
                            arrElement.task = old_text;
                            nodeConvert()
                            alert('task already exists')
                        }
                    }
                }
            }
        })
        nodeConvert()
    }
})
let index = '';
let old_text = '';
let new_text = '';
// create tasks
let arr = [];
function createTask() {
    let obj = {
        task: properCase(inpt.value),
        completed: false
    }
    // if(String(inpt.value).trim()){
    if (String(inpt.value).trim().length != 0){
        let isDuplicate = arr.some(element => String(element.task).trim().toLocaleLowerCase() == String(obj.task).trim().toLowerCase());

        if (!isDuplicate) {
            arr.push(obj)
        } else {
            alert('Task already exists')
        }
    }
    // }
    inpt.value = '';
    nodeConvert()
}
// convert tasks into nodes
function nodeConvert() {
    tasksCont.innerHTML = ''
    for (let arrElement of arr) {
        const newTask = document.createElement('div')
        const checkbox = document.createElement('input');
        const newText = document.createElement('pre');

        // new task
        newTask.classList.add('new-task');
        tasksCont.prepend(newTask);

        // h1
        newText.innerHTML = arrElement.task;
        newText.classList.add('new-text')
        newTask.append(newText);
        // checkbox
        checkbox.setAttribute('type', 'checkbox');
        checkbox.classList.add('checkbox');
        newTask.append(checkbox);


        checkbox.addEventListener('click', (e) => {
            e.stopPropagation()
            arrElement.completed = checkbox.checked;
            newText.classList.toggle('line-through')
        })

        newText.addEventListener('dblclick', (e) => {
            if (checkbox.checked == false) {
                old_text = newText.innerHTML;
                for (const ar of arr) {
                    if (ar.task == old_text) {
                        index = arr.indexOf(ar);
                    }
                }
                newText.contentEditable = true
            }
        });
    }
    removeTask()
}

function properCase(str){
    let a = String(str).toLowerCase();
    a = a.slice(0,1).toUpperCase() + a.slice(1)
    return a;
}
// DONE // when tasks are being edited, check whether the changed task already exist.


// DONE // make the tasks delete when right clicked on them
function removeTask(){
    const newTasks = document.querySelectorAll('.new-task');
    for(const newTask of newTasks){
        newTask.addEventListener('contextmenu',(e)=>{
            e.preventDefault()
            for(const ar of arr){
                if(ar.task == newTask.querySelector('.new-text').innerHTML){
                    arr.splice(arr.indexOf(ar),1);
                    newTask.remove()
                }
            }
        })
    }
}

// save the 'arr' to localStorage

// move the tasks to the end when checked

// 