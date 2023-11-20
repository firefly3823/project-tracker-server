const projects = require('../Models/projectSchema')

//add Projects
exports.addProjects = async (req, res) => {
    console.log("Inside add project function");
    const userId = req.payload
    const projectThumb = req.file.filename
    // console.log(userId);
    const { title, language, overview, github, website } = req.body
    // console.log(title, language, overview, projectImage, github, website,userId);
    try {
        const existingProject = await projects.findOne({ github })
        if (existingProject) {
            res.status(406).json("Project already exists..! Upload another project")
        } else {
            const newProject = new projects({
                title, language, overview, github, website, projectThumb, userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    } catch (err) {
        res.status(401).json(`Register API Failed ${err}`)

    }
}

//only user Project

exports.allUserProjects = async (req,res)=>{
    const userId = req.payload
    try{
        const userProject = await projects.find({userId})
        res.status(200).json(userProject)
    }catch(err){
        res.status(401).json(err)
    }
}

//all Project - token req
exports.allProjects = async (req, res) => {
    try {
        const projectDetails = await projects.find()
        res.status(200).json(projectDetails)
    } catch (err) {
        res.status(401).json(err)
    }
}

//get home projects

exports.getHomeProjects = async (req,res)=> {
    try {
        const homeProjects = await projects.find().limit(3)
        res.status(200).json(homeProjects)
    } catch (err) {

        res.status(401).json(err)
    }
}