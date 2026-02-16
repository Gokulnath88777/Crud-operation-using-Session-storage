const userName=document.getElementById("name")
const errorMsg=document.querySelectorAll(".errorMsg")
const form=document.getElementById("form")
const display=document.getElementById("display")
const detailDisp=document.getElementById("detailShow")
const close=document.getElementById("close")
const submitbtn=document.getElementById("submitbtn")
const outerDisplay=document.getElementById("outerContainer")
const update=document.getElementById("updateBtn")
const editClose=document.getElementById("editClose")
let userBtn=document.getElementById("userBtn")
let phoneBtn = document.getElementById("phoneBtn")
let emailBtn=document.getElementById("emailBtn")
let editData=document.querySelector(".editData")
let updateClose=document.getElementById("updateClose")
const userNameReges=/^[a-zA-Z._ ]+$/

let isPhone=false
let isEmail=false
let isName=false

function userNameCheck()
{
    if(userName.value)
    {

    
    if(!userNameReges.test(userName.value.trim()))
    {
        errorMsg[0].style.visibility="visible"
        errorMsg[0].textContent="The user Name is invalid"
        isName=false
    }
    else
    {
        errorMsg[0].style.visibility="hidden"
        errorMsg[0].textContent=""
        isName=true
    }
    }
    else
    {
        errorMsg[0].style.visibility="visible"
        errorMsg[0].textContent="The Field is Empty"
        isName=false
    }
}

let phone=document.getElementById("phone")
let phoneRegex=/^[6-9]\d{9}$/

function phoneCheck()
{
    if(phone.value)
    {
    if(!phoneRegex.test(phone.value.trim()))
    {
        errorMsg[1].style.visibility="visible";
        errorMsg[1].textContent="The Phone Number is invalid"
        isPhone=false
    }
    else{
        errorMsg[1].style.visibility="hidden";
        errorMsg[1].textContent=""
        isPhone=true
        
    }

}
else
{
    errorMsg[1].style.visibility="visible"
    errorMsg[1].textContent="The Field is Empty"
    isPhone=false
}

}
let email=document.getElementById("email")
emailRegex=/^[a-zA-Z0-9.+_]+\@gmail\.com$/

function emailCheck()
{
   if(email.value)
   {
    if(!emailRegex.test(email.value.trim()))
    {
        errorMsg[2].style.visibility="visible"
        errorMsg[2].textContent="The email is invalid"
        isEmail=false
    }
    else
    {
        errorMsg[2].style.visibility="hidden"
        errorMsg[2].textContent=""
        isEmail=true
    }
}
else
{
    errorMsg[2].style.visibility="visible"
    errorMsg[2].textContent="The Field is Empty"
    isEmail=false
}
}

function storeData()
{   
    if(isPhone && isEmail && isName)
    { 
    
        let detail={
        user:userName.value,
        userPhone:phone.value,
        userEmail:email.value
        }
        let details=JSON.parse(sessionStorage.getItem("users"))||[]
        details.push(detail)
        userName.value=""
        phone.value=""
        email.value=""
        sessionStorage.setItem("users",JSON.stringify(details))
      
    }
 

}
function del()
{
    let userData=JSON.parse(sessionStorage.getItem("users"))
    let delValue=document.querySelectorAll(".delete")
    let deletedData;
    delValue.forEach((delValue)=> {
    delValue.addEventListener("click",function(e)
    {
        deletedData=e.target.parentElement
        e.target.parentElement.remove()
        let pTag = deletedData.querySelectorAll("p")
        let index=userData.findIndex((userData)=>userData.userEmail==pTag[2].textContent)
        userData.splice(index,1)
        sessionStorage.setItem("users",JSON.stringify(userData))
       displayDetails()
    })
})  
}
let editIndex=null
function edit()
{ 
    let userData=JSON.parse(sessionStorage.getItem("users"))||[]
    let editButtons=document.querySelectorAll(".edit")
    let nameChange=document.getElementById("nameChange")
    let phoneChange=document.getElementById("phoneChange")
    let emailChange=document.getElementById("emailChange")
    editButtons.forEach((editButtons)=>
     {
        editButtons.addEventListener("click",function(e)
        {
            editData.style.display="block"
            let datas=e.target.parentElement
            let p=datas.querySelectorAll("p")
            let emailValue = p[2].textContent
            editIndex = userData.findIndex( user => user.userEmail === emailValue )
            nameChange.value=p[0].textContent
            phoneChange.value=p[1].textContent
            emailChange.value=p[2].textContent

        } )
     })
  
    
           
    }
update.addEventListener("click",()=>
 {
    
    let userData=JSON.parse(sessionStorage.getItem("users"))||[]
    userData[editIndex].user=nameChange.value
    userData[editIndex].userPhone=phoneChange.value
    userData[editIndex].userEmail=emailChange.value
    sessionStorage.setItem("users",JSON.stringify(userData))
    editData.style.display="none"
    displayDetails()
})

function displayDetails()
{ 
  display.innerHTML=""
  let userData=JSON.parse(sessionStorage.getItem("users"))||[]
  for(let i=0;i<userData.length;i++)
  {
    let div=document.createElement("div")
    div.classList.add("data")
    let p1=document.createElement("p")
    let p2=document.createElement("p")
    let p3=document.createElement("p")
    let delbtn=document.createElement("button")
    let editbtn=document.createElement("button")
    delbtn.textContent="Delete"
    editbtn.textContent="Edit"
    delbtn.setAttribute("class","delete")
    editbtn.setAttribute("class","edit")
    p1.textContent=userData[i].user
    p2.textContent=userData[i].userPhone
    p3.textContent=userData[i].userEmail
    div.appendChild(p1)
    div.appendChild(p2)
    div.appendChild(p3)
    div.appendChild(delbtn)
    div.appendChild(editbtn)
    display.appendChild(div)
    del() 
    edit()
  }
}

detailDisp.addEventListener("click",()=>
{
        displayDetails()
        outerDisplay.style.display="grid"
        form.style.display="none"
    
   })
close.addEventListener("click",()=>
{
       form.style.display="block"
       outerDisplay.style.display="none"

})
updateClose.addEventListener("click",()=>
{
    editData.style.display="none"
})
submitbtn.addEventListener("click",(event)=>
{
    event.preventDefault()
    userNameCheck()
    phoneCheck()
    emailCheck()
    storeData()
 
})




