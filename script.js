const cursor = document.getElementById('cursor');

(function() {
    'use strict';
    
    function ruinPage() {
        const mediaElements = document.querySelectorAll('audio, video');
        mediaElements.forEach(media => {
            media.pause();
            media.currentTime = 0;
        });
        
        document.body.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #000;
                color: #f00;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Courier New', monospace;
                font-size: 18px;
                z-index: 99999;
                cursor: none;
                overflow: hidden;
            ">
                <div style="text-align: center;">
                    <div style="font-size: 36px; margin-bottom: 20px; text-shadow: 0 0 10px #f00;">⚠️ ACCESS DENIED ⚠️</div>
                    <div>YOU CAN'T VIEW MY SOURCE</div>
                    <div style="font-size: 14px; margin-top: 20px; color: #888;">
                        Nice try but this page is protected
                    </div>
                </div>
            </div>
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes glitch {
                0% { transform: translate(0); }
                20% { transform: translate(-2px, 2px); }
                40% { transform: translate(-2px, -2px); }
                60% { transform: translate(2px, 2px); }
                80% { transform: translate(2px, -2px); }
                100% { transform: translate(0); }
            }
            body > div {
                animation: glitch 0.3s infinite;
            }
        `;
        document.head.appendChild(style);
        
        document.addEventListener('keydown', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        });
        
        document.addEventListener('mousedown', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        });
        
        console.clear();
    }
    
    document.onkeydown = function(e) {
        if (e.ctrlKey && e.keyCode === 85) {
            ruinPage();
            return false;
        }
    };
    
    document.addEventListener('contextmenu', function(e) {
        ruinPage();
        return false;
    });
    
    document.addEventListener('keydown', function(e) {
        if (
            e.keyCode === 123 ||
            (e.ctrlKey && e.shiftKey && e.keyCode === 73) ||
            (e.ctrlKey && e.shiftKey && e.keyCode === 74) ||
            (e.ctrlKey && e.keyCode === 85) ||
            (e.ctrlKey && e.keyCode === 83) ||
            (e.ctrlKey && e.shiftKey && e.keyCode === 67)
        ) {
            ruinPage();
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    });
    
    let devToolsOpen = false;
    
    const checkDevTools = function() {
        const widthThreshold = window.outerWidth - window.innerWidth > 160;
        const heightThreshold = window.outerHeight - window.innerHeight > 160;
        
        if ((widthThreshold || heightThreshold) && !devToolsOpen) {
            devToolsOpen = true;
            disableWebsite();
        }
    };
    
    setInterval(checkDevTools, 1000);
    
    const originalConsole = {
        log: console.log,
        warn: console.warn,
        error: console.error,
        info: console.info
    };
    
    console.log = function() {
        disableWebsite();
        originalConsole.log.apply(console, ['🔒 Security: Console access blocked']);
    };
    
    console.warn = function() {
        disableWebsite();
        originalConsole.warn.apply(console, ['🔒 Security: Console access blocked']);
    };
    
    console.error = function() {
        disableWebsite();
        originalConsole.error.apply(console, ['🔒 Security: Console access blocked']);
    };
    
    console.info = function() {
        disableWebsite();
        originalConsole.info.apply(console, ['🔒 Security: Console access blocked']);
    };
    
    function disableWebsite() {
        const mediaElements = document.querySelectorAll('audio, video');
        mediaElements.forEach(media => {
            media.pause();
            media.currentTime = 0;
        });
        
        document.body.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: black;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: Arial, sans-serif;
                font-size: 24px;
                z-index: 99999;
            ">
                <div style="text-align: center;">
                    <div style="font-size: 48px; margin-bottom: 20px;">🔒</div>
                    <div>You cant access me never.</div>
                    <div style="font-size: 14px; margin-top: 20px; opacity: 0.7;">
                        Developer tools are not allowed
                    </div>
                </div>
            </div>
        `;
        
        window.stop();
    }
    
    if (window.self !== window.top) {
        disableWebsite();
    }
    
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    });
    
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });
    
    function debuggerProtection() {
        const handler = setInterval(function() {
            debugger;
        }, 100);
        
        window.addEventListener('focus', function() {
            clearInterval(handler);
            setTimeout(debuggerProtection, 100);
        });
    }
    
    debuggerProtection();
    
})();

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
  cursor.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
  cursor.style.transform = 'scale(1)';
});

const enterBtn = document.getElementById('enterBtn');
const enterScreen = document.getElementById('enterScreen');
const card = document.getElementById('card');
const music = document.getElementById('bgMusic');

enterBtn.addEventListener('click', async () => {
  enterScreen.classList.add('fade-out');
  card.classList.add('show');
  setTimeout(() => enterScreen.remove(), 1000);
  try {
    music.volume = 0;
    await music.play();
    let vol = 0;
    const fade = setInterval(() => {
      vol += 0.02;
      if(vol>=0.7){vol=0.7;clearInterval(fade);}
      music.volume=vol;
    },100);
    music.addEventListener('ended',()=>{music.currentTime=0;music.play();});
  } catch(err){console.log('Playback error:',err);}
});

const discordPresence = document.getElementById('discordPresence');
const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');
const activityContainer = document.getElementById('activityContainer');

const DISCORD_USER_ID = '1362795100526088416';

async function fetchDiscordPresence() {
  try {
    const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`);
    const data = await response.json();
    
    if (data.success) {
      const user = data.data;
      
      updateStatus(user.discord_status, user.active_on_discord);
      
      updateActivities(user.activities);
    } else {
      throw new Error('Failed to fetch Discord presence');
    }
  } catch (error) {
    console.error('Error fetching Discord presence:', error);
    statusText.textContent = 'Discord status unavailable';
    activityContainer.innerHTML = '<div class="no-activity">Unable to load activity</div>';
  }
}

function updateStatus(status, isActive) {
  statusDot.className = 'status-dot';
  
  switch(status) {
    case 'online':
      statusDot.classList.add('status-online');
      statusText.textContent = 'Online on Discord';
      break;
    case 'idle':
      statusDot.classList.add('status-idle');
      statusText.textContent = 'Idle on Discord';
      break;
    case 'dnd':
      statusDot.classList.add('status-dnd');
      statusText.textContent = 'Do Not Disturb';
      break;
    default:
      statusDot.classList.add('status-offline');
      if (isActive) {
        statusText.textContent = 'Online on Discord Mobile';
      } else {
        statusText.textContent = 'Offline';
      }
  }
}

function updateActivities(activities) {
  activityContainer.innerHTML = '';
  
  const spotifyActivity = activities.find(activity => activity.type === 2);
  
  if (spotifyActivity) {
    const spotifyEl = document.createElement('div');
    spotifyEl.className = 'spotify-activity';
    
    const albumArtUrl = spotifyActivity.assets?.large_image 
      ? `https://i.scdn.co/image/${spotifyActivity.assets.large_image.replace('spotify:', '')}`
      : 'https://img.icons8.com/ios-filled/50/1ed760/spotify.png';
    
    spotifyEl.innerHTML = `
      <img src="${albumArtUrl}" alt="Album Art" class="spotify-album-art">
      <div class="spotify-info">
        <div class="spotify-song">${spotifyActivity.details || 'Unknown Song'}</div>
        <div class="spotify-artist">by ${spotifyActivity.state || 'Unknown Artist'}</div>
      </div>
      <i class="fab fa-spotify spotify-icon"></i>
    `;
    activityContainer.appendChild(spotifyEl);
  }
  
  const otherActivities = activities.filter(activity => 
    (activity.type === 0 || activity.type === 4) && activity.type !== 2
  );
  
  if (otherActivities.length > 0) {
    otherActivities.forEach(activity => {
      const activityEl = document.createElement('div');
      activityEl.className = 'activity';
      
      if (activity.type === 4) {
        activityEl.innerHTML = `
          <div class="activity-name">${activity.emoji ? activity.emoji.name + ' ' : ''}${activity.state || ''}</div>
        `;
      } else {
        activityEl.innerHTML = `
          <div class="activity-name">Playing ${activity.name}</div>
          ${activity.details ? `<div class="activity-details">${activity.details}</div>` : ''}
          ${activity.state ? `<div class="activity-details">${activity.state}</div>` : ''}
        `;
      }
      
      activityContainer.appendChild(activityEl);
    });
  } else if (!spotifyActivity) {
    activityContainer.innerHTML = '<div class="no-activity">No activity</div>';
  }
}

fetchDiscordPresence();
setInterval(fetchDiscordPresence, 30000);

const createSnowflake = () => {
  const flake=document.createElement('div');
  flake.className='snowflake';
  flake.style.left=Math.random()*window.innerWidth+'px';
  flake.style.animationDuration=(3+Math.random()*4)+'s';
  flake.style.opacity=0.5+Math.random()*0.5;
  flake.style.width=flake.style.height=4+Math.random()*8+'px';
  document.body.appendChild(flake);
  setTimeout(()=>flake.remove(),8000);
};
setInterval(createSnowflake,100);

const trailCount = 20;
const trail = [];
for (let i = 0; i < trailCount; i++) {
  const s = document.createElement('div');
  s.className = 'mouse-sparkle';
  s.style.opacity = 0;
  document.body.appendChild(s);
  trail.push({
    el: s,
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    vx: 0,
    vy: 0,
    angle: Math.random()*360,
    scale: 1,
    opacity: 0
  });
}

const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

function animateTrail() {
  trail.forEach((s, i) => {
    s.vx += (mouse.x - s.x) * 0.15;
    s.vy += (mouse.y - s.y) * 0.15;
    s.x += s.vx;
    s.y += s.vy;
    s.vx *= 0.8;
    s.vy *= 0.8;

    s.angle += 0.2 + Math.random()*0.3;
    s.scale *= 0.96;
    s.opacity += 0.05;
    if (s.opacity > 1) s.opacity = 1;
    s.opacity *= 0.92;

    s.el.style.transform = `translate(${s.x - 6}px, ${s.y - 6}px) rotate(${s.angle}deg) scale(${s.scale})`;
    s.el.style.opacity = s.opacity;
  });
  requestAnimationFrame(animateTrail);
}
animateTrail();

function createParticle() {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = Math.random() * window.innerWidth + 'px';
  particle.style.top = window.innerHeight + 'px';
  particle.style.animationDuration = (6 + Math.random() * 6) + 's';
  particle.style.opacity = 0.3 + Math.random() * 0.4;
  particle.style.width = particle.style.height = (2 + Math.random() * 4) + 'px';
  document.body.appendChild(particle);
  
  setTimeout(() => {
    particle.remove();
  }, 15000);
}

setInterval(createParticle, 200);

for(let i = 0; i < 15; i++) {
  setTimeout(createParticle, i * 100);
}