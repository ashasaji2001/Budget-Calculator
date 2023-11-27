
// user name display
const loggedkey=localStorage.getItem('loggedkey');
let welcomemsg=document.getElementById("welcomemsg")

displayincomeexpense();
displayexpenseArray()
displayincomeArray()


function gotoregister(){
    window.location='./register.html'
}
function logout(){
    
    window.location='./index.html';
  
}

function clearAll(){
   let res=confirm("Are you sure you want clear all data ?")
 if(res){
        let newobj=JSON.parse(localStorage.getItem(loggedkey));
        newobj.income=0;
        newobj.expense=0;  
        newobj.incomeArray=[];
        newobj.expenseArray=[];      
        localStorage.setItem(newobj.uname,JSON.stringify(newobj))   
        displayincomeexpense();
        document.getElementById("incomedetails").innerHTML='';
        document.getElementById("expensedetails").innerHTML='';
        
        alert("Cleared all data successfully")
        }   


}

// Adding income Array

function addincomeArray(type,amt,bal){
    
    let incomeobj={
        type:type,
        amt:amt,
        bal:bal,
       
    }
    let newobj=JSON.parse(localStorage.getItem(loggedkey));
    
    newobj.incomeArray.push(incomeobj);
    
    localStorage.setItem(loggedkey,JSON.stringify(newobj));
    


}
// adding expense Array
function addexpenseArray(type,amt,bal){
    
    let expenseobj={
        type:type,
        amt:amt,
        bal:bal,
       
    }
    let newobj=JSON.parse(localStorage.getItem(loggedkey));
    
    newobj.expenseArray.push(expenseobj);
    
    localStorage.setItem(loggedkey,JSON.stringify(newobj));

}
// display incomeArray
function displayincomeArray(incomeArray){
    let newobj=JSON.parse(localStorage.getItem(loggedkey));
    let incomearray=newobj.incomeArray;
     let incomedetails=document.getElementById("incomedetails")
      incomedetails.innerHTML='';
    for(i of incomearray){
   
    let output=`<tr>
                <td>${i.type}</td>  
                 <td>+${i.amt}</td> 
                 <td>${i.bal}</td> 
                
                 </tr>`
      incomedetails.innerHTML+=output ;         
    }
}

// display ExpenseArray
function displayexpenseArray(){
    let newobj=JSON.parse(localStorage.getItem(loggedkey));
    let expenseArray=newobj.expenseArray;
    let expensedetails=document.getElementById("expensedetails")
    expensedetails.innerHTML='';
    for(i of expenseArray){
   
    expensedetails.innerHTML+=`<tr>
                         <td>${i.type}</td>  
                         <td>-${i.amt}</td> 
                         <td>${i.bal}</td> 
                        
    </tr>`
    }

}


function Register(){
    email=document.getElementById("email").value
    uname=document.getElementById("uname").value
    passwd=document.getElementById("passwd").value
    console.log(email);
    if(email=='' || uname=='' || passwd==''){
        alert("Enter All Fields")
    }
    else{
        if(email in localStorage){
            alert("User email Already registered")
        }
        else{
            const userobj={
                    uname:uname,
                    passwd:passwd,
                    email:email,
                    income:0,
                    expense:0,
                    incomeArray:[],
                    expenseArray:[]

            }
            localStorage.setItem(uname,JSON.stringify(userobj))
            alert("User Registered Successfully")
            let modal=document.getElementById("exampleModal")
            window.location='./index.html';

        }
    }
}

// login
function login(event){
    event.preventDefault();
    let username=document.getElementById("username").value
    let password=document.getElementById("password").value

    if(username=='' || password==''){
        alert("Enter all fields")
    }
    else{
        if(username in localStorage){
            
            let newobj=JSON.parse(localStorage.getItem(username));
            console.log(newobj);
            if(password== newobj.passwd){
                localStorage.setItem('loggedobj',JSON.stringify(newobj))
                localStorage.setItem('loggedkey',username)
                window.location='./home.html'
            }
            else{
                alert("Wrong Password: login failed")
                document.getElementById("formlogin").reset()
            }
            

        }
        else{
            alert("User Does not exist, Please register")
        }
    }
}

// display income and expense
function displayincomeexpense(){
    let obj=JSON.parse(localStorage.getItem(loggedkey))
    
    let originalobj=JSON.parse(localStorage.getItem(obj.uname))
    let incomedisplay=document.getElementById("incomedisplay")
    let expensedisplay=document.getElementById("expensedisplay")
    incomedisplay.innerHTML=`Rs ${originalobj.income}/- `
    expensedisplay.innerHTML=`Rs ${originalobj.expense}/-`


}
// Add Income
function addIncome(event){
    event.preventDefault();
    let incometype=document.getElementById("incometype").value
     let incomeamt=document.getElementById("incomeamt").value
    if(incometype ==''||incomeamt==''){
        alert("Enter All Fields")
    }
    else{
        let newobj=JSON.parse(localStorage.getItem(loggedkey))

        newobj.income=newobj.income+parseFloat(incomeamt);
        let date=new Date().toISOString();
        console.log(date);   
        console.log(newobj);            
        localStorage.setItem(loggedkey,JSON.stringify(newobj))
        alert("Amount Added Successfully")
        displayincomeexpense();
        addincomeArray(incometype,incomeamt,newobj.income,date);
         displayincomeArray()
        document.getElementById("incomeform").reset();

    }


}
// Add Expense
function addExpense(event){
    event.preventDefault();
    let expensetype=document.getElementById("expensetype").value
    let expenseamt=document.getElementById("expenseamt").value
    if(expensetype==''|| expenseamt==''){
        alert("Enter All Fields")
    }
    else{
        let newobj=JSON.parse(localStorage.getItem(loggedkey))
        if(expenseamt >newobj.income){
            alert("Insufficient amount")
        }
        else{
            newobj.income=newobj.income-parseFloat(expenseamt)
            newobj.expense=newobj.expense+parseFloat(expenseamt)
            localStorage.setItem(newobj.uname,JSON.stringify(newobj))
            let date=new Date().toISOString();
            
            alert("expense added successfully")
            document.getElementById("expenseform").reset();
            displayincomeexpense();
            addexpenseArray(expensetype,expenseamt,newobj.income,date);
            displayexpenseArray();
            displaychart();
            
        }
    }
}


