let registerService = async(data)=>{
    try{
        let{name,email,password }= data
        if(!name||!email||!password){
        return res.status(400).json({
            message:"All field are required"
        })
    }
    let isExisting = await userModel.findOne({email})
    if(isExisting){
        return res.status(409).json({
            message:"user already exists"
        })
    }
    let hashedPassword = bcrypt.hashSync(password,10)
    let newUser = await userModel.create({
        name,
        email,
        password:hashedPassword
    })

    let accessToken = generateAccesssToken(newUser._id);
    let refreshToken = generateRefreshToken(newUser._id);

    return{
        accessToken, referenceToken, newUser
    }
       
    }
    catch(error){
      throw new Error(error)
    }
}
export default registerService;