const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "F8_PLAYER";

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: {},
  // (1/2) Uncomment the line below to use localStorage
  config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
  songs: [
      {
        name: 'Thay tôi yêu cô ấy (ĐNSTĐ) - Thanh Hưng- 替我爱她 (Chinese cover)- Mei',
        path: '../nhac/Thay tôi yêu cô ấy (ĐNSTĐ) - Thanh Hưng- 替我爱她 (Chinese cover)- Mei.mp3',
        artist: 'Thanh Hưng- 替我爱她 (Chinese cover)- Mei',
        image: '../nhac/Thay toi yeu co ay.jpg'
      },
      {
    
          name: 'TAEYANG - Eyes, Nose, Lips (Speed Up 1.1x) 眼鼻嘴(DJ抖音版). Nhạc Nền Hot TikTok - Douyin 2025',
    path: '../nhac/TAEYANG - Eyes, Nose, Lips (Speed Up 1.1x) 眼鼻嘴(DJ抖音版). Nhạc Nền Hot TikTok - Douyin 2025.mp3',
    artist: 'Eyes, Nose, Lips (Speed Up 1.1x) 眼鼻嘴(DJ抖音版). Nhạc Nền Hot TikTok',
    image: '../nhac/TAEYANG.jpg'

      },
      {
    name: 'Bên Trên Tầng Lầu (Orinn Remix) - Tăng Duy Tân - Nhạc Trẻ Remix Hot TikTok Gây Nghiện Hay Nhất 2022',
    path: '../nhac/Bên Trên Tầng Lầu (Orinn Remix) - Tăng Duy Tân - Nhạc Trẻ Remix Hot TikTok Gây Nghiện Hay Nhất 2022.mp3',
    artist: 'Tăng Duy Tân',
    image: '../nhac/bentren.jpg'
},
{
    name: 'HIEU CUNG - RA KHƠI ft. DRUM7 - OFFICIAL MUSIC VIDEO',
    path: '../nhac/HIEU CUNG - RA KHƠI ft. DRUM7 - OFFICIAL MUSIC VIDEO.mp3',
    artist: 'RA KHƠI ft. DRUM7',
   image: '../nhac/rakhoi.jpg'
},
{
    name: 'Thứ Quý Giá Nhất Anh Có Được',
    path: '../nhac/Thứ Quý Giá Nhất Anh Có Được.mp3',
    artist: 'Không rõ',
     image: '../nhac/Thu quy gia nhat.jpg'
},
{
    name: '卢润泽 - 别让爱凋落 (DJ卡点节奏版) Đừng Để Tình Yêu Phai Tàn (Remix Tiktok) - Lư Nhuận Trạch - My Love DJ抖音版',
    path: '../nhac/卢润泽 - 别让爱凋落 (DJ卡点节奏版) Đừng Để Tình Yêu Phai Tàn (Remix Tiktok) - Lư Nhuận Trạch - My Love DJ抖音版.mp3',
    artist: '别让爱凋落 (DJ卡点节奏版) Đừng Để Tình Yêu Phai Tàn (Remix Tiktok)',
    image: '../nhac/dung de tinh yeu phai tan.jpg'
},
{
    name: 'Quên Một Người Từng Yêu (Tuấn Smile Remix) - Hoàng Ly Người Mang Cho Em Tổn Thương Em Vẫn Yêu Remix',
    path: '../nhac/Quên Một Người Từng Yêu (Tuấn Smile Remix) - Hoàng Ly Người Mang Cho Em Tổn Thương Em Vẫn Yêu Remix.mp3',
    artist: 'Hoàng Ly Người Mang Cho Em Tổn Thương Em Vẫn Yêu Remix',
    image: '../nhac/Quen 1 nguoi tung yeu.jpg'
},
{
    name: 'Ngoại Lệ x Hãy Trao Cho Anh Remix - SS x AM Remix Nhạc Remix Hot TikTok 2025',
    path: '../nhac/Ngoại Lệ x Hãy Trao Cho Anh Remix - SS x AM Remix Nhạc Remix Hot TikTok 2025.mp3',
    artist: 'SS x AM Remix Nhạc Remix Hot TikTok 2025',
    image: '../nhac/Ngoai le x hay trao cho anh.jpg'
},
{
    name: 'Cô Gái À, Em Đừng Khóc Nữa (Thazh x Đông Remix) - Thiên Tú  Nhạc Remix Hot Trend TikTok 2025',
    path: '../nhac/Cô Gái À, Em Đừng Khóc Nữa (Thazh x Đông Remix) - Thiên Tú  Nhạc Remix Hot Trend TikTok 2025.mp3',
    artist: 'Thiên Tú  Nhạc Remix Hot Trend TikTok 2025',
    image: '../nhac/co gai a.jpg'
},
{
    name: 'XUẤT SƠN x CỐT TRUYỆN BI THƯƠNG x ĐÁY BIỂN - ALBUM TRACK REMIX HOT TIK TOK 2024 - D2O MEDIA GROUP',
    path: '../nhac/XUẤT SƠN x CỐT TRUYỆN BI THƯƠNG x ĐÁY BIỂN - ALBUM TRACK REMIX HOT TIK TOK 2024 - D2O MEDIA GROUP.mp3',
    artist: 'ALBUM TRACK REMIX HOT TIK TOK 2024',
     image: '../nhac/mashup.jpg'
},
{
    name: 'MIXTAPE #3 - LIST NHẠC TRUNG (VIETZ x WIRARWR REMIX) - THĂM CỐ TRI, ĐÁY BIỂN, MẠC VẤN QUY KỲ...',
    path: '../nhac/MIXTAPE #3 - LIST NHẠC TRUNG (VIETZ x WIRARWR REMIX) - THĂM CỐ TRI, ĐÁY BIỂN, MẠC VẤN QUY KỲ....mp3',
    artist: 'LIST NHẠC TRUNG (VIETZ x WIRARWR REMIX)',
     image: '../nhac/mashup2.jpg'
},
{
    name: '七元 - Not snow,but U - 我期待的不是雪英文版動態歌詞MV',
    path: '../nhac/七元 - Not snow,but U - 我期待的不是雪英文版動態歌詞MV.mp3',
    artist: 'Not snow,but U',
       image: '../nhac/not Snow but u.jpg'
},
  ],
  setConfig: function (key, value) {
    this.config[key] = value;
    // (2/2) Uncomment the line below to use localStorage
    localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
                        <div class="song ${
                          index === this.currentIndex ? "active" : ""
                        }" data-index="${index}">
                            <div class="thumb"
                                style="background-image: url('${song.image}')">
                            </div>
                            <div class="body">
                                <h3 class="title">${song.name}</h3>
                                <p class="author">${song.artist}</p>
                            </div>
                            <div class="option">
                                <i class="fas fa-ellipsis-h"></i>
                                 <div class="dropdown-menu">
                                  <a href="#">Option 1</a>
                                  <a href="#">Option 2</a>
                                  <a href="#">Option 3</a>
                                </div>
                            </div>
                        </div>
                    `;
    });
    playlist.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      }
    });
  },
  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;

    // Xử lý CD quay / dừng
    // Handle CD spins / stops
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000, // 10 seconds
      iterations: Infinity
    });
    cdThumbAnimate.pause();

    // Xử lý phóng to / thu nhỏ CD
    // Handles CD enlargement / reduction
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    // Xử lý khi click play
    // Handle when click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    // Khi song được play
    // When the song is played
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    // Khi song bị pause
    // When the song is pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    // Khi tiến độ bài hát thay đổi
    // When the song progress changes
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;

        //cập nhật thời gian hiện tại
        $(".current-time").textContent = _this.formatTime(audio.currentTime);
      }
    };
    

    // Xử lý khi tua song
    // Handling when seek
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    // Khi next song
    // When next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Khi prev song
    // When prev song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Xử lý bật / tắt random song
    // Handling on / off random song
    randomBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    };

    // Xử lý lặp lại một song
    // Single-parallel repeat processing
    repeatBtn.onclick = function (e) {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    // Xử lý next song khi audio ended
    // Handle next song when audio ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    
    // Lắng nghe hành vi click vào playlist
    // Listen to playlist clicks
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");

      if (songNode || e.target.closest(".option")) {
        // Xử lý khi click vào song
        // Handle when clicking on the song
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }
      };
       const optionNode = e.target.closest(".option");
      if (optionNode) {
          const dropdownMenu = optionNode.querySelector(".dropdown-menu");
          if (dropdownMenu) {
            dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
          }
      }

      addSongBtn.onclick = function () {
        const newSong = {
          name: songNameInput.value,
          artist: songArtistInput.value,
          path: songUrlInput.value,
          image: songImageInput.value
        };
        _this.songs.push(newSong);
        _this.render();
        songNameInput.value = '';
        songArtistInput.value = '';
        songUrlInput.value = '';
        songImageInput.value = '';
      };
        
      }
  },
  formatTime: function (seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }, 300);
    
  },
  
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;

    audio.onloadedmetadata = () => {
        const duration = audio.duration;
        $(".music-time").textContent = this.formatTime(duration);
      };
      if ('mediaSession' in navigator) {
        navigator.mediaSession.setActionHandler('play', function () {
          audio.play();
        });
      
        navigator.mediaSession.setActionHandler('pause', function () {
          audio.pause();
        });
      
        navigator.mediaSession.setActionHandler('previoustrack', function () {
          app.prevSong();
          audio.play();
        });
      
        navigator.mediaSession.setActionHandler('nexttrack', function () {
          app.nextSong();
          audio.play();
        });
      
        navigator.mediaSession.metadata = new MediaMetadata({
          title: app.currentSong.name,
          artist: app.currentSong.artist,
          album: 'Music Player',
          artwork: [
            { src: app.currentSong.image, sizes: '96x96', type: 'image/png' },
            { src: app.currentSong.image, sizes: '128x128', type: 'image/png' },
            { src: app.currentSong.image, sizes: '192x192', type: 'image/png' },
            { src: app.currentSong.image, sizes: '256x256', type: 'image/png' },
            { src: app.currentSong.image, sizes: '384x384', type: 'image/png' },
            { src: app.currentSong.image, sizes: '512x512', type: 'image/png' },
          ]
        });
      }
      
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: this.currentSong.name,
          artist: this.currentSong.artist,
          album: 'Music Player',
          artwork: [
            { src: this.currentSong.image, sizes: '96x96', type: 'image/png' },
            { src: this.currentSong.image, sizes: '128x128', type: 'image/png' },
            { src: this.currentSong.image, sizes: '192x192', type: 'image/png' },
            { src: this.currentSong.image, sizes: '256x256', type: 'image/png' },
            { src: this.currentSong.image, sizes: '384x384', type: 'image/png' },
            { src: this.currentSong.image, sizes: '512x512', type: 'image/png' },
          ]
        });
      }
  },
  
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  
  start: function () {
    // Gán cấu hình từ config vào ứng dụng
    // Assign configuration from config to application
    this.loadConfig();

    // Định nghĩa các thuộc tính cho object
    // Defines properties for the object
    this.defineProperties();

    // Lắng nghe / xử lý các sự kiện (DOM events)
    // Listening / handling events (DOM events)
    this.handleEvents();

    // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    // Load the first song information into the UI when running the app
    this.loadCurrentSong();

    // Render playlist
    this.render();

    // Hiển thị trạng thái ban đầu của button repeat & random
    // Display the initial state of the repeat & random button
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);
  }
};

//mở menu
const menuToggle = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav-list');

menuToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
});
window.addEventListener('scroll', () => {
    if (navList.classList.contains('active')) {
        navList.classList.remove('active');
    }
});

app.start();

