//elemenets registration and SignIn

window.addEventListener('DOMloaded',()=>{
    document.getElementsByTagName('form').reset()

})
window.addEventListener('load',(e)=>{
    console.log('yes');
    if(JSON.parse(localStorage.getItem('login')!==null)){
        signInElements.style.transform="translateY(100%)"
        signRegElements.style.top=-100+'%'
        userInfo.style.transform="translateY(0%)"
        const login = JSON.parse(localStorage.getItem('login'))
        document.querySelector('.user').style.top=40+'%'
        firstName.textContent=`Your FirstName:${login.firstName}`
        lastname.textContent=`Your LastName:${login.lastName}`
    }
    
})

const registrationBtn = document.querySelector('.btn--registation')
const signInBtn = document.querySelector('.btn--signIn')
//elemetns enter and registation
const signRegElements=document.querySelector('.enter--translatet-Y')

// elements form registr
const formRegElemnts = document.querySelector('.form-row')
const btnElements  = [...document.querySelectorAll('.btn--translatey-Y')]
const backBtnRegistForm = document.querySelector('.btn--backup')
// elements form SignIn
const signInElements = document.querySelector('.wrapper-form')
const backBtnSignIn = document.querySelector('.btn--backup-lk')


// open form registration
const openFormReg = () =>{
    formRegElemnts.style.transform= "translateY(0)"
    btnElements.map(btn=>{
        btn.style.transform= "translateY(0)"
    })
    signRegElements.style.top = 110+'%'
    signInElements.style.transform="translateY(100%)"
}

registrationBtn.addEventListener('click',openFormReg)

// close form registration
const closeFormReg = () => {
    formRegElemnts.style.transform= "translateY(120%)"
    btnElements.map(btn=>{
        btn.style.transform= "translateY(120%)"
    })
    signRegElements.style.top = 50+'%'
}

backBtnRegistForm.addEventListener('click',closeFormReg)

// open form sign in 
const openFormSignIn = () =>{
    signInElements.style.transform="translateY(0%)"
    signRegElements.style.top = 110 + '%'
}

signInBtn.addEventListener('click',openFormSignIn)

// close form sign in 
const closeFormSignIn = ()=>{
    signRegElements.style.top = 50+'%'
    signInElements.style.transform="translateY(100%)"
}

backBtnSignIn.addEventListener('click',closeFormSignIn)

//check field
const valuePattern = /^([a-zA-Z-А-Яа-я]{0,16})$/
const isRequired = value => value
?undefined
:'Required';
const isEmail = value =>value.includes('@')
?undefined
:'Should be an email';
const islongValue = value=>value.length>=3
?undefined
:'Too short, 3 letters or more'
const isletter=value=>valuePattern.test(value)
?undefined
:'Letters only'
const isRepeat = value=>keysPass===value
?undefined
:'No repeat'

const passwordElements = document.querySelector('.passwordReg')
const key = passwordElements
let  keysPass =''
key.addEventListener('keyup',(e)=>{
    keysPass=key.value
})


const validaterByField = {
    email:[isRequired,isEmail],
    name:[isRequired,islongValue,isletter],
    lastname:[isRequired,islongValue,isletter],
    password:[isRequired,islongValue,isletter],
    repeatpas:[isRequired,islongValue,isletter,isRepeat],
}



// const regExpEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



// field form registration 
const nameReg = document.querySelector('.nameReg')
const emails = document.querySelector('.emailReg')
const lastName = document.querySelector('.reg-lastname')
const repeatPass = document.querySelector('.pass-repeat')
//validater
const validater = (fieldName,value) =>{
    const validaters = validaterByField[fieldName]
    return validaters
        .map(validator=>validator(value))
        .filter(errorText=>errorText)
        .join(', ')
}

//check name 
const errorName = document.querySelector('.error-firstname')
const nameOnChange = event =>{
    const errotText = validater('name',event.target.value)
    errorName.textContent=errotText
}
const errorLastName = document.querySelector('.error-lastname')
const lastNameOnChange = event =>{
    const errorText = validater('lastname',event.target.value)
    errorLastName.textContent=errorText
}
//check email
const errorMail = document.querySelector('.error-email')
const emailOnChange = event =>{
    const errorText = validater('email',event.target.value)
    errorMail.textContent=errorText
}

//check password
const errorPassword = document.querySelector('.error-password')
const passwordOnChange = event =>{
    const errorText = validater('password',event.target.value)
    errorPassword.textContent=errorText
}

const errorRepeatPass = document.querySelector('.error-password--repeat')
const repeatPassChange = event =>{
    const errorText = validater('repeatpas',event.target.value)
    errorRepeatPass.textContent=errorText
}


const UserLogReg = document.querySelector('.reg')
const regEmail = document.getElementById('regemail')



// reg form func 
const newFormData = ()=>{
    const formData = [...new FormData(UserLogReg)]    
            .reduce((acc,[key,value])=>
                ({...acc,[key]:value})
            ,{})
  localStorage.setItem(`${regEmail.value}`,JSON.stringify(formData))
}

const movFormRegEl = () => {
    formRegElemnts.style.transform= "translateY(120%)"
    btnElements.map(btn=>{
      btn.style.transform= "translateY(120%)"
      })
    //   signRegElements.style.transform="translateY(0%)"
}
// registration of a new user
const formUserInfo = event=>{

    event.preventDefault()
    if(errorName.textContent===''&&errorLastName.textContent===''&&errorMail.textContent===''&&errorPassword.textContent===''&& errorRepeatPass.textContent===''){
        newFormData()
        movFormRegEl()
        alert('registration completed')
        UserLogReg.reset()
    }
    

}

UserLogReg.addEventListener('submit',formUserInfo)
emails.addEventListener('input',emailOnChange)
nameReg.addEventListener('input',nameOnChange)
lastName.addEventListener('input',lastNameOnChange)
passwordElements.addEventListener('input',passwordOnChange)
repeatPass.addEventListener('input',repeatPassChange)


// elements personal account
const btnEnterAccount = document.querySelector('.getIntoTheAccount')
const emailAcc = document.querySelector('.emailAcc')
const passwordAcc = document.querySelector('.passwordAcc')
const userInfo = document.querySelector('.user--inner')
const firstName =document.querySelector('.firstname')
const lastname =document.querySelector('.lastname')
// login to your personal account
const formAccount = (event) =>{
    event.preventDefault()
    const data = JSON.parse(localStorage.getItem(`${emailAcc.value}`))
    if(data!==null){
        if(emailAcc.value===data.email && passwordAcc.value===data.password){
        signInElements.style.transform="translateY(100%)"
        userInfo.style.transform="translateY(0%)"
        document.querySelector('.user').style.top=40+'%'
        firstName.textContent=`Your FirstName:${data.firstName}`
        lastname.textContent=`Your LastName:${data.lastName}`
        document.querySelector('.form--enter-translatey').reset()
        localStorage.setItem('login',JSON.stringify(data))
        }
        else{
            alert('not correct login/password')
         }
    }  
     else{
       alert('Unknown user')
    }
}
btnEnterAccount.addEventListener('click',formAccount)

const signOut = document.querySelector('.signout')


const signOutChange = (e) => {
    e.preventDefault()
    document.querySelector('.user').style.top=-100+'%'
    firstName.textContent=``
    lastname.textContent=``
    signRegElements.style.top = 50 + '%'
    localStorage.removeItem('login')
}

signOut.addEventListener('click',signOutChange)




document.querySelector('.container').addEventListener('click',(e)=>{

    let state
    // const btn = e.target.tagName('BUTTON')
    if(e.target.tagName !=='BUTTON'){
        return 
    }
    state = {page:e.target.getAttribute('btn')}
    console.log(state);
    e.preventDefault()

})