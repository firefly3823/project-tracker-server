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
