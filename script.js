
let jobs = [
    { id: 1, company: "Mobile First Corp", position: "React Native Developer", location: "Remote", type: "Full-time", salary: "$130,000 - $175,000", desc: "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.", status: "none" },
    { id: 2, company: "WebFlow Agency", position: "Web Designer & Developer", location: "Los Angeles, CA", type: "Part-time", salary: "$80,000 - $120,000", desc: "Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends.", status: "none" },
    { id: 3, company: "DataViz Solutions", position: "Data Visualization Specialist", location: "Boston, MA", type: "Full-time", salary: "$125,000 - $165,000", desc: "Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking.", status: "none" },
    { id: 4, company: "CloudFirst Inc", position: "Backend Developer", location: "Seattle, WA", type: "Full-time", salary: "$140,000 - $190,000", desc: "Design and maintain scalable backend systems using Python and AWS. Work with modern DevOps practices.", status: "none" },
    { id: 5, company: "Innovation Labs", position: "UI/UX Engineer", location: "Austin, TX", type: "Full-time", salary: "$110,000 - $150,000", desc: "Create beautiful and functional user interfaces for our suite of products. Strong design skills required.", status: "none" },
    { id: 6, company: "MegaCorp Solutions", position: "JavaScript Developer", location: "New York, NY", type: "Full-time", salary: "$130,000 - $170,000", desc: "Build enterprise applications with JavaScript and modern frameworks. We offer competitive compensation.", status: "none" },
    { id: 7, company: "StartupXYZ", position: "Full Stack Engineer", location: "Remote", type: "Full-time", salary: "$120,000 - $160,000", desc: "Join our fast-growing startup and work on our core platform. Experience with Node.js and React required.", status: "none" },
    { id: 8, company: "TechCorp Industries", position: "Senior Frontend Developer", location: "San Francisco, CA", type: "Full-time", salary: "$130,000 - $175,000", desc: "We are looking for an experienced Frontend Developer to build scalable web applications using React.", status: "none" }
];

let currentTab = 'all';


const jobsList = document.getElementById('jobs-list');
const emptyState = document.getElementById('empty-state');
const totalCountEl = document.getElementById('total-count');
const interviewCountEl = document.getElementById('interview-count');
const rejectedCountEl = document.getElementById('rejected-count');
const jobStatusCountEl = document.getElementById('job-status-count');
const tabBtns = document.querySelectorAll('.tab-btn');


function render() {

    const total = jobs.length;
    const interviewCount = jobs.filter(j => j.status === 'interview').length;
    const rejectedCount = jobs.filter(j => j.status === 'rejected').length;

    totalCountEl.innerText = total;
    interviewCountEl.innerText = interviewCount;
    rejectedCountEl.innerText = rejectedCount;

 
    let filteredJobs = jobs;
    if (currentTab === 'interview') filteredJobs = jobs.filter(j => j.status === 'interview');
    if (currentTab === 'rejected') filteredJobs = jobs.filter(j => j.status === 'rejected');

    jobStatusCountEl.innerText = `${filteredJobs.length} jobs`;


    if (filteredJobs.length === 0) {
        jobsList.innerHTML = '';
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
        jobsList.innerHTML = filteredJobs.map(job => `
            <div class="job-card">
                <button class="delete-btn" onclick="deleteJob(${job.id})"><i class="fa-regular fa-trash-can"></i></button>
                <h3>${job.company}</h3>
                <p class="position">${job.position}</p>
                <p class="meta">${job.location} • ${job.type} • ${job.salary}</p>
                <div class="status-badge">${job.status === 'none' ? 'Not Applied' : job.status.toUpperCase()}</div>
                <p class="desc">${job.desc}</p>
                <div class="card-actions">
                    <button class="btn btn-interview ${job.status === 'interview' ? 'active' : ''}" 
                        onclick="updateStatus(${job.id}, 'interview')">INTERVIEW</button>
                    <button class="btn btn-rejected ${job.status === 'rejected' ? 'active' : ''}" 
                        onclick="updateStatus(${job.id}, 'rejected')">REJECTED</button>
                </div>
            </div>
        `).join('');
    }
}


window.updateStatus = (id, newStatus) => {
    const job = jobs.find(j => j.id === id);
    if (job.status === newStatus) {
        job.status = 'none'; 
    } else {
        job.status = newStatus;
    }
    render();
};


window.deleteJob = (id) => {
    jobs = jobs.filter(j => j.id !== id);
    render();
};


tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentTab = btn.getAttribute('data-tab');
        render();
    });
});

render();