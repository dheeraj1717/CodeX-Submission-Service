async function pingRequest(request, reply){
    console.log(this.testService);
    const response = await this.testService.pingCheck();
    return { message: response };
}

async function createSubmission(req, res){
    const response = await this.submissionService.addSubmission(req.body);
    return res.status(201).send({
        success: true,
        message: "Submission added successfully",
        data: response
    });
}

module.exports = {pingRequest, createSubmission};