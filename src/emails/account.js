const sgmail = require("@sendgrid/mail")


sgmail.setApiKey(process.env.SENDGRID_API_KEY)

const sendwelcome =(email,name)=>{
  sgmail.send({
      to:email,
      from:"banerjeeankush184@gmail.com",
      subject:"thanks for joining in!",
      text:`welcome to the app ,${name} . let me know how you get along with the app`
  })
}

const byemail = (email,name)=>{
  sgmail.send({
    to:email,
    from:"banerjeeankush184@gmail.com",
    subject:"thanks for joining in!",
    text:`It seems like ur discontinuing our app,${name} . let us know where we can improve thank you`
})
}
module.exports={
    sendwelcome,
    byemail
}