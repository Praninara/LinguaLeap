import jwt from 'jsonwebtoken';


const generateToken = (res,userId)=>{
    const token = 123456;

    //set a jwt in a cookie
    res.cookie("jwt",token,{
        httpOnly : true,
        secure : process.env.NODE_ENV !== 'developement',
        sameSite : 'strict',
        maxAge : 30 *24 *60*60*100 //30 days in milli sec
    })

}

export default generateToken;