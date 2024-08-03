async function fet(){
    let res = await fetch("http://localhost:3000/patient")
    let r = await res.json()
    let sh = document.querySelector('#showdata')

    let ans = r.map((e)=>`
    
    <tr border="1">
        <td>${e.id}</td>
        <td>${e.pt_name}</td>
        <td>${e.ad}</td>
        <td>${e.dt}</td>
        <td>${e.time}</td>
        <td>${e.ac}</td>
        <td> <button onclick="mydelete(${e.id})"> Delete  </button></td>
        <td> <button onclick="myupdate(${e.id})"> Edit </button></td>
        
    </tr>

    `).join(" ")

    sh.innerHTML=ans
}
fet()

//delete data

function mydelete(id){
    fetch(`http://localhost:3000/patient/${id}`,{
        method:'DELETE'
    })
    .then(res=>alert("delete successfully"))
}

// insert data

function addData(){
    let myfrmdata = {
        id:document.getElementById('id').value,
        pt_name:document.getElementById('pnm').value,
        ad:document.getElementById('ad').value,
        dt:document.getElementById('dt').value,
        time:document.getElementById('tm').value,
        ac:document.getElementById('ac').value
    }
    

    fetch("http://localhost:3000/patient",{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(myfrmdata)
    })

    .then(res=>alert("inserted"))
    .catch(er=>alert("error"))
}

// edit data
var strid = 0
async function myupdate(id){
    strid=id
   
    let res = await fetch(`http://localhost:3000/patient/${id}`)
    let r = await res.json()
    let p =`
     <input type="text" value="${r.id}" id="id1" readonly>
     <input type="text" value="${r.pt_name}" id="name1">
     <input type="text" value="${r.ad}" id="ad1">
     <input type="text" value="${r.dt}"  id="dt1">
     <input type="text" value="${r.time}" id="time1">
     <input type="text" value="${r.ac}" id="ac1">
     <input type="submit" onclick="finalupdate()" value="update">
    `

    document.getElementById('demo').innerHTML=p

}

function finalupdate(){
    let y = {
        id:document.getElementById('id1').value,
        pt_name:document.getElementById('name1').value,
        ad:document.getElementById('ad1').value,
        dt:document.getElementById('dt1').value,
        time:document.getElementById('time1').value,
        ac:document.getElementById('ac1').value
        
    }

    fetch(`http://localhost:3000/patient/${strid}`,{
        method:'PUT',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(y)
    })
    .then(res=>alert("Updated"))
    .catch(ress=>alert("error"))
}