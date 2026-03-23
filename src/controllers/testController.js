async function pingRequest(request, reply){
    console.log(this.testService);
    const response = await this.testService.pingCheck();
    return { message: response };
}

module.exports = {pingRequest};