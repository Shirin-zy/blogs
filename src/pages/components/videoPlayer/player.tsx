import React, { useState, useRef, useEffect } from "react";
import "./player.less";

interface PlayerProps {
  videoSrc?: string;
  posterSrc?: string;
}

const Player: React.FC<PlayerProps> = ({
  videoSrc = "https://fastcdn.mihoyo.com/content-v2/plat/100679/2de4c434ac1296d16d71b9e4dd4d65db_4377941326290013663.mp4",
  // videoSrc = "",
  posterSrc,
}) => {
  const [showModal, setShowModal] = useState(false);
  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // 自动播放预览视频
    if (previewVideoRef.current) {
      previewVideoRef.current.play().catch(console.error);
    }
  }, []);

  const handlePlayClick = () => {
    setShowModal(true);

    // 暂停预览视频
    if (previewVideoRef.current) {
      previewVideoRef.current.pause();
    }

    // 延迟播放模态框视频，确保DOM已渲染
    setTimeout(() => {
      if (modalVideoRef.current) {
        modalVideoRef.current.play().catch(console.error);
      }
    }, 100);
  };

  const handleCloseModal = () => {
    setShowModal(false);

    // 暂停模态框视频
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }

    // 恢复预览视频播放
    if (previewVideoRef.current) {
      previewVideoRef.current.play().catch(console.error);
    }
  };

  const handleModalVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* 全屏预览播放器 */}
      <div className="player-container">
        <video
          ref={previewVideoRef}
          className="preview-video"
          src={videoSrc}
          poster={posterSrc}
          loop
          muted
          playsInline
        />

        {/* 播放按钮覆盖层 */}
        <div className="play-overlay">
          <div className="title">
            <span>Exploration</span>
            <span>is essence</span>
            <span>of</span>
            <span>human spirit</span>
          </div>
          <div className="icon">
            <div className="play-button" onClick={handlePlayClick}>
              {/* 矩形播放按钮 */}
              <svg
                width="100"
                height="60"
                viewBox="0 0 100 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1 L85 1 L99 15 L99 59 L1 59 Z"
                  stroke="white"
                  strokeWidth="1"
                  fill="none"
                />
                <path d="M40 20L60 30L40 40Z" fill="white" />
              </svg>
            </div>
            <div className="mouse">
              {/* 鼠标指针标识 */}
              <svg
                width="24"
                height="36"
                viewBox="0 0 24 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mouse-indicator"
              >
                <path
                  d="M12 0C5.373 0 0 5.373 0 12v12c0 6.627 5.373 12 12 12s12-5.373 12-12V12C24 5.373 18.627 0 12 0zm0 2c5.514 0 10 4.486 10 10v12c0 5.514-4.486 10-10 10S2 29.514 2 24V12C2 6.486 6.486 2 12 2z"
                  fill="white"
                />
                <rect x="11" y="8" width="2" height="10" rx="1" fill="white" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 模态框播放窗口 */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={handleModalVideoClick}>
            <button className="close-button" onClick={handleCloseModal}>
              ×
            </button>
            <video
              ref={modalVideoRef}
              className="modal-video"
              src={videoSrc}
              controls
              autoPlay
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Player;
