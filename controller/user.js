const Division = require('../model/Division');
const User = require('../model/User');

const getAllUser = async(req, res, next)=>{
  try {
    //TUGAS NOMOR 1
    const users = await User.findAll({
      include: [Division]
    });   
    
    const usersMap = users.map((User) => ({
      id:User.id,
      fullName:User.fullName,
      nim:User.nim,
      angkatan:User.angkatan,
      divisionId:User.divisionId,
      division:User.division.name
    }));

    res.status(300).json({
      status: "Success",
      message: "Successfully fetch all user data",
      user:usersMap
    })

  } catch (error) {
    console.log(error.message);
  }
}

const getUserById = async(req,res,next)=>{
  try {
    //TUGAS NOMOR 2 cari user berdasarkan userId
    const {userId} = req.params
    const user = await User.findOne({
      where: {id: userId},
      include: [Division]
    });

    if(user == undefined){
      res.status(400).json({
          status: "Error",
          message: `User with Id ${userId} is not existed`
      })
    }

    const userMap ={
      id:user.id,
      fullName:user.fullName,
      nim:user.nim,
      angkatan:user.angkatan,
      divisionId:user.divisionId,
      division:user.division.name
    }
    
    res.status(200).json({
      status:"Success",
      message: "Succesfully fetch user data",
      user: userMap
    })

  } catch (error) {
    console.log(error.message);
  }
}

const postUser = async(req,res,next)=>{
  try {
    const {
      fullName, nim, angkatan, email, password, division
    } = req.body

    
    //pakai await untuk menghindari penulisan then
    const user_division = await Division.findOne({
      where:{
        name: division
      }
    });

    //cari divisi id
    if(user_division == undefined){
      res.status(400).json({
        status: "Error",
        message: `${division} is Not Defined`
      })
    }
    //SELECT * FROM DIVISION WHERE name = division
    if(!user_division){
      const error = new Error(`${division} is not existed`)
      error.statusCode = 400;
      throw Error;
    }

    //insert data ke tabel User
    const currentUser = await User.create({
      //nama field: data
      fullName: fullName,
      //jika nama field == data maka bisa diringkas
      email,
      password,
      angkatan,
      nim,
      divisionId: user_division.id
    })

    //send response
    res.status(201).json({
      status: "success",
      message: "Successfuly create User",
      user: {
        fullName: currentUser.fullName,
        division: currentUser.division
      }
    })

  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message
    })
  }
}

const deleteUser = (req,res,next)=>{
  try {
    const {userId} = req.params;

    //mencari index user dari array model user
    const targetedIndex = User.findIndex((element)=>{
      return element.id == userId
    })

    //user tidak ketemu
    if(targetedIndex === -1){
      res.status(400).json({
        status: "Error",
        message: `User with id ${userId} is not existed`
      })
    }

    //hapus array pada [targetedIndex] sebanyak 1 buah element
    User.splice(targetedIndex, 1);

    res.status(200).json({
      status: "Success",
      message: "Successfully delete user"
    })
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  getAllUser, getUserById, postUser, deleteUser
}