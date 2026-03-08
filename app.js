const API="https://phi-lab-server.vercel.app/api/v1/lab/issues"

let allIssues=[]

// Load all issues
async function loadIssues(){
  document.getElementById("loading").classList.remove("hidden")
  const res=await fetch(API)
  const data=await res.json()
  allIssues=data.data
  displayIssues(allIssues)
  document.getElementById("loading").classList.add("hidden")
}

// Display issues in grid
function displayIssues(issues){
  const container=document.getElementById("issues")
  container.innerHTML=""
  document.getElementById("issueCount").innerText=issues.length

  issues.forEach(issue=>{
    let border=issue.status==="open"
      ?"border-t-4 border-green-500"
      :"border-t-4 border-purple-500"

    container.innerHTML+=`
<div onclick="openModal(${issue.id})"
class="bg-white shadow-md rounded-lg p-4 ${border} cursor-pointer hover:shadow-lg transition">

  <!-- Priority Section -->
  <div class="flex justify-between items-center mb-2">
    <div class="flex justify-between items-center w-20">
      <span>
        ${
          issue.priority.toLowerCase() === "high" ? 
          '<img src="Open-Status.png" alt="Open">' :
          issue.priority.toLowerCase() === "medium" ?
          '<img src="Open-Status.png" alt="Open">' :
          '<img src="Closed- Status .png" alt="">'
        }
      </span>
      <p class="ml-1 text-sm font-semibold">${issue.priority.toUpperCase()}</p>
    </div>
  </div>

  <h2 class="font-semibold text-lg mb-1">
    ${issue.title}
  </h2>

  <p class="text-sm text-gray-500 mb-3">
    ${issue.description}
  </p>

  <div class="flex justify-between items-center gap-2 mb-3">
    <div class="flex gap-2 mb-3">
      <div class="flex justify-between items-center gap-2">
        <span class="badge badge-error flex justify-between items-center gap-2">
          ${issue.labels[0]}
        </span>
      </div>
    </div>
    <div class="flex gap-2 mb-3">
      <div class="flex justify-between items-center gap-2">
        <span class="badge badge-error flex justify-between items-center gap-2">
          ${issue.labels[1]}
        </span>
      </div>
    </div>
  </div>

  <div class="flex justify-between text-sm text-gray-500">
    <span>#${issue.id} by ${issue.author}</span>
    <span>${issue.createdAt}</span>
  </div>

</div>
`
  })
}
// Tabs filter
function changeTab(type,element){
  document.querySelectorAll(".tab-btn").forEach(btn=>{
    btn.classList.remove("bg-blue-500","text-white")
    btn.classList.add("btn-outline")
  })

  element.classList.remove("btn-outline")
  element.classList.add("bg-blue-500","text-white")

  if(type==="all") displayIssues(allIssues)
  if(type==="open") displayIssues(allIssues.filter(i=>i.status==="open"))
  if(type==="closed") displayIssues(allIssues.filter(i=>i.status==="closed"))
}

// Search issues
async function searchIssue(){
  let text=document.getElementById("searchInput").value
  document.getElementById("loading").classList.remove("hidden")
  let res=await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`)
  let data=await res.json()
  displayIssues(data.data)
  document.getElementById("loading").classList.add("hidden")
}
loadIssues()