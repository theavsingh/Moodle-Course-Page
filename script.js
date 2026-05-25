document.addEventListener("DOMContentLoaded", function() {
    
    // Toggle mobile navigation menu visibility
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');

    menuBtn.onclick = function() {
        mainNav.classList.toggle('show');

        // Change the hamburger icon to an X when the menu is opened
        if (mainNav.classList.contains('show')) {
            this.textContent = '✖';
        } else {
            this.textContent = '☰';
        }
    };

    // Handle active state highlighting for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => {
                l.style.backgroundColor = '#e2e8f0';
                l.style.color = '#004085';
            });

            this.style.backgroundColor = '#d4af37';
            this.style.color = '#002244';
        });
    });

    // Expand and collapse announcement dropdown sections
    const toggles = document.querySelectorAll('.toggle-btn');

    for (let i = 0; i < toggles.length; i++) {
        toggles[i].onclick = function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            content.classList.toggle('show');

            if (content.classList.contains('show')) {
                this.textContent = this.textContent.replace("▼", "▲");
            } else {
                this.textContent = this.textContent.replace("▲", "▼");
            }
        };
    }

    // Calculate and update live dashboard numbers
    function updateDashboardStats() {
        const totalAssignments = document.querySelectorAll('.task-card').length;
        const totalAnnouncements = document.querySelectorAll('.announcement-item').length;
        const completedTasks = document.querySelectorAll('.status.completed').length;
        const pendingTasks = document.querySelectorAll('.status.pending').length;

        const statTotal = document.getElementById('stat-total-assignments');
        const statAnnouncements = document.getElementById('stat-announcements');
        const statCompleted = document.getElementById('stat-completed');
        const statPending = document.getElementById('stat-pending');

        if (statTotal) statTotal.textContent = totalAssignments;
        if (statAnnouncements) statAnnouncements.textContent = totalAnnouncements;
        if (statCompleted) statCompleted.textContent = completedTasks;
        if (statPending) statPending.textContent = pendingTasks;
    }

    // Manage assignment status clicks and save to local storage
    const taskCards = document.querySelectorAll('.task-card');

    taskCards.forEach(card => {
        const statusBadge = card.querySelector('.status');
        const taskTitle = card.querySelector('h3').textContent;
        
        if (statusBadge) {
            statusBadge.style.cursor = 'pointer';

            if (localStorage.getItem(taskTitle) === 'completed') {
                statusBadge.classList.remove('pending');
                statusBadge.classList.add('completed');
                statusBadge.textContent = 'Submitted';
            }
            
            statusBadge.addEventListener('click', function() {
                if (this.classList.contains('pending')) {
                    this.classList.remove('pending');
                    this.classList.add('completed');
                    this.textContent = 'Submitted';
                    
                    localStorage.setItem(taskTitle, 'completed');
                    alert(`Success: ${taskTitle} has been marked as submitted!`);
                    
                } else if (this.classList.contains('completed')) {
                    this.classList.remove('completed');
                    this.classList.add('pending');
                    this.textContent = 'Pending';
                    
                    localStorage.removeItem(taskTitle);
                    alert(`Reverted: ${taskTitle} has been marked as pending!`);
                }
                
                updateDashboardStats(); 
            });
        }
    });

    updateDashboardStats();

    // Trigger floating toast notification for file downloads
    const downloadLinks = document.querySelectorAll('a[download]');
    const downloadToast = document.getElementById('download-toast');
    const toastMessage = document.getElementById('toast-message');

    downloadLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); 
            
            const fileName = this.textContent.replace('📄', '').trim();
            
            toastMessage.textContent = `Downloading: ${fileName}`;
            downloadToast.classList.add('show');
            
            // Automatically hide the popup window after 3 seconds pass
            setTimeout(() => {
                downloadToast.classList.remove('show');
            }, 3000);
        });
    });

});