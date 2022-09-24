
console.log('hey')
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
        console.log(inputElement.files[0])  
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
 console.log(this.TeamList)
}

function GetLeastEfficient(num = 5) {
    console.log(this.UploadedFile[2])
    this.leastArray = new Array(num).fill({ emp: '', hrs: -1 })
    let empExist = false
    let least
    let arr = [...this.UploadedFile]


    for (let i = 0; i < this.UploadedFile.length-1500; i++) {
    
        empExist = false
        least = ''
        let index =-1
        this.leastArray.map((ele, ind )=> {
            if (ele['hrs'] == -1 ) {
                index = ind
                empExist = ele['emp']==this.UploadedFile[i]['Owner']
            } else if ((ele['hrs'] > this.UploadedFile[i]['Hours'])) {
                index = ind
                empExist = ele['emp']==this.UploadedFile[i]['Owner']
            }
        })
        console.log(empExist, index,this.leastArray.filter(ele => ele['emp']==this.UploadedFile[i]['Owner']).length)
        if(this.leastArray.filter(ele => ele['emp']==this.UploadedFile[i]['Owner']).length<1 && index>-1) {
            this.leastArray[index]['hrs'] = this.UploadedFile[i]['Hours'];
            this.leastArray[index]['emp'] = this.UploadedFile[i]['Owner'];
        } else {
            
        }
    }

    console.log(this.leastArray)
}