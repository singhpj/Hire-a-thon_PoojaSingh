

var UploadedFile = []
var TeamList = []
var leastArray=[]
function getFile() {
    this.UploadedFile = []
    let fileReader= new FileReader()
    let inputElement = document.createElement('input')
    inputElement.setAttribute('type','file')
    inputElement.click();
    inputElement.addEventListener('change', event => {
        let file=inputElement.files[0]
        // console.log(inputElement.files[0])  
        fileReader.onload = (data) => {
            // console.log(fileReader.result, data.target.result)
            let WB = XLSX.read(data.target.result, {type:"binary"})
            // console.log(WB.Sheets[WB.SheetNames[0]])
            this.UploadedFile = XLSX.utils.sheet_to_json(WB.Sheets[WB.SheetNames[0]])
            // console.log(this.UploadedFile)
        }

        fileReader.readAsArrayBuffer(file)
    })

}

function Evaluate() {
    this.TeamList = []
    if (this.UploadedFile.length < 1) {
        alert('Upload Data fist')
        return
    }
    this.TeamList.push({
        project: this.UploadedFile[0]['Project Name'],
        teamName: this.UploadedFile[0]['Team'],
        count: 1,
        time: this.UploadedFile[0]['Hours']
    })
    let index = -1;
    let teamExists = false;
    for (let i = 1; i < this.UploadedFile.length; i++){
        index = -1;
        teamExists = false;
        this.TeamList.map((ele,ind) => {
            if (ele['teamName']?.toString()?.toLowerCase() == this.UploadedFile[i]['Team']?.toString().toLowerCase() &&
            ele['project']?.toString()?.toLowerCase()== this.UploadedFile[i]['Project Name']?.toString().toLowerCase()
            ) {
                teamExists = true;
                index = ind
            }
        })

        if (teamExists) {
            this.TeamList[index]['count'] += 1
            this.TeamList[index]['time'] += this.UploadedFile[i]['Hours']
            this.TeamList[index]['project']= this.UploadedFile[i]['Project Name']
        } else {
            this.TeamList.push({
                project: this.UploadedFile[i]['Project Name'],
                teamName: this.UploadedFile[i]['Team'],
                count: 1,
                time: this.UploadedFile[i]['Hours'],
            }) 
        }
    }
    this.getMean('team')
}


function getMean(val){
    if (val == 'team') {
        for (let i = 0; i < this.TeamList.length; i++){
            this.TeamList[i]['meanValue']= (Number(this.TeamList[i]['time'])/Number(this.TeamList[i]['count'])).toFixed(2)
        }
    }
    // console.log(this.TeamList)
    document.getElementById('result').innerText = JSON.stringify(this.TeamList)
    
}

function GetLeastEfficient() {
    let num = Number(document.getElementById('inp').value)
    if (num < 1) {
        alert('Value should be greater than 0')
        return
    }
    if (this.UploadedFile.length < 1) {
        alert('Upload Data fist')
        return
    }
    this.leastArray 
    let index = 0
    
    while(this.UploadedFile.length>index){
        if (this.leastArray.length == 0) {
            this.leastArray.push({
                emp: this.UploadedFile[index]['Owner'],
                hrs: Number(this.UploadedFile[index]['Hours'])
            })
        } else {
            let x = this.leastArray.filter(ele => ele?.emp == this.UploadedFile[index]['Owner']).length
            if (x > 0) {
                this.leastArray.map(ele => {
                    ele.hrs = (ele?.emp == this.UploadedFile[index]['Owner'] && ele?.hrs > this.UploadedFile[index]['Hours'] )?Number(this.UploadedFile[index]['Hours']):ele?.hrs
                })
            } else {
                this.leastArray.push({
                    emp: this.UploadedFile[index]['Owner'],
                    hrs: Number(this.UploadedFile[index]['Hours'])
                })
            }
        }
        index++
    }
    // console.log(this.leastArray)

    // console.log(this.leastArray.sort((a, b) => a.hrs - b.hrs))
    // console.log(this.leastArray)
    
    document.getElementById('result').innerText = JSON.stringify(this.leastArray.slice(0,num))

}

