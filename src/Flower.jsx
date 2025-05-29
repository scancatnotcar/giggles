import React, { useState, useEffect, useRef } from 'react';
import {
  IconButton,
  Paper,
  Typography,
  Tooltip,
  Button,
  Box,
  CircularProgress,
  Modal,
  TextField,
  Snackbar,
  Alert
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { motion, useAnimation } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { styled } from '@mui/system';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, addDoc, doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from './firebase'; // Import your firebase config
import Navbar from './navbar';
import bouquet1 from './images/bouquet1.svg';
import bouquet2 from './images/bouquet2.svg';
import bouquet3 from './images/bouquet3.svg';
import bouquet4 from './images/bouquet4.svg';

const bouquets = [bouquet1, bouquet2, bouquet3, bouquet4];

const flowerPositionsMap = [
  [
    { top: 10, left: 20 },
    { top: 0, left: 35 },
    { top: 25, left: 30 },
    { top: 22, left: 40 },
    { top: 10, left: 50 },
    { top: 10, left: 65 }
  ],
  [
    { top: 10, left: 20 },
    { top: 2, left: 35 },
    { top: 10, left: 50 },
    { top: 10, left: 65 },
    { top: 18, left: 30 },
    { top: 24, left: 45 }
  ],
  [
    { top: 0, left: 25 },
    { top: 15, left: 15 },
    { top: 25, left: 30 },
    { top: 8, left: 47 },
    { top: 10, left: 65 },
    { top: 25, left: 63 }
  ],
  [
    { top: 15, left: 18 },
    { top: 5, left: 33 },
    { top: 20, left: 35 },
    { top: 30, left: 45 },
    { top: 5, left: 50 },
    { top: 20, left: 60 }
  ]
];

const Container = styled('div')({
  textAlign: 'center',
  padding: '2rem',
  fontFamily: '"Helvetica Neue", Arial, sans-serif',
  maxWidth: 800,
  margin: '0 auto'
});

const BouquetWrapper = styled('div')({
  position: 'relative',
  width: 500,
  height: 500,
  margin: '0 auto',
  '@media (max-width: 600px)': {
    width: '100%',
    height: 'auto',
    aspectRatio: '1/1'
  }
});

const BouquetImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  cursor: 'pointer',
  borderRadius: 20,
  boxShadow: '0 6px 15px rgba(0,0,0,0.2)'
});

const FlowersContainer = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
});

const FlowerBox = styled(motion.div)({
  position: 'absolute',
  width: 80,
  height: 80,
  borderRadius: '50%',
  overflow: 'hidden',
  border: '2px solid white',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.05)'
  },
  '@media (max-width: 600px)': {
    width: '15%',
    height: 'auto',
    aspectRatio: '1/1'
  }
});

const Caption = styled('div')({
  fontSize: 12,
  marginTop: 4,
  color: '#555',
  fontFamily: '"Indie Flower", cursive',
  textAlign: 'center'
});

const CuteShareButton = styled(Button)({
  background: '#ffe6ec',
  color: '#d63384',
  fontFamily: '"Indie Flower", cursive',
  fontWeight: 'bold',
  padding: '0.6rem 1.5rem',
  borderRadius: 20,
  marginTop: 16,
  boxShadow: '0 4px 10px rgba(214, 51, 132, 0.3)',
  '&:hover': {
    background: '#ffd6e8'
  }
});

const UploadButton = styled(Button)({
  background: '#e3f2fd',
  color: '#1976d2',
  fontFamily: '"Indie Flower", cursive',
  fontWeight: 'bold',
  padding: '0.6rem 1.5rem',
  borderRadius: 20,
  margin: '8px 8px 8px 0',
  boxShadow: '0 4px 10px rgba(25, 118, 210, 0.2)',
  '&:hover': {
    background: '#bbdefb'
  }
});

const ModalBox = styled(Paper)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxWidth: '90%',
  padding: '1.5rem',
  borderRadius: 15,
  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
  fontFamily: '"Indie Flower", cursive',
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
});

const ShareUrlBox = styled(Box)({
  backgroundColor: '#f5f5f5',
  padding: '0.8rem',
  borderRadius: 8,
  border: '1px solid #ddd',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginTop: '0.5rem'
});

const Flower = () => {
  const { shareId } = useParams();
  const navigate = useNavigate();
  const [currentBouquet, setCurrentBouquet] = useState(0);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [userImages, setUserImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [wishText, setWishText] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [shareUrl, setShareUrl] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isViewMode, setIsViewMode] = useState(false);
  const [sharedData, setSharedData] = useState(null);

  const controls = useAnimation();
  const { width, height } = useWindowSize();
  const fileInputRef = useRef(null);
  const flowerPositions = flowerPositionsMap[currentBouquet];

  // Load shared bouquet if shareId exists
  useEffect(() => {
    if (shareId) {
      loadSharedBouquet(shareId);
    }
  }, [shareId]);

  const loadSharedBouquet = async (id) => {
    try {
      setIsLoading(true);
      const docRef = doc(db, 'messages', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSharedData(data);
        setCurrentBouquet(data.bouquetIndex || 0);
        setUserImages(data.images || []);
        setWishText(data.wishText || '');
        setRecipientName(data.recipientName || '');
        setIsViewMode(true);
        
        // Increment view count
        try {
          await updateDoc(docRef, {
            views: increment(1),
            lastViewedAt: new Date()
          });
        } catch (viewError) {
          console.log('Could not update view count:', viewError);
        }
        
        // Show the shared message
        setSnackbar({
          open: true,
          message: `${data.senderName || 'Someone'} shared a bouquet with you!`,
          severity: 'info'
        });
      } else {
        setSnackbar({
          open: true,
          message: 'Shared bouquet not found.',
          severity: 'error'
        });
        navigate('/flower');
      }
    } catch (error) {
      console.error('Error loading shared bouquet:', error);
      setSnackbar({
        open: true,
        message: 'Error loading shared bouquet.',
        severity: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isEnvelopeOpen) {
      controls.start({
        scale: [1, 1.05, 1],
        rotate: [0, 2, -2, 0],
        transition: { duration: 0.5 }
      });
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isEnvelopeOpen, controls]);

  const handlePrev = () => {
    if (!isViewMode) {
      setCurrentBouquet((prev) => (prev === 0 ? bouquets.length - 1 : prev - 1));
    }
  };

  const handleNext = () => {
    if (!isViewMode) {
      setCurrentBouquet((prev) => (prev + 1) % bouquets.length);
    }
  };

  const toggleEnvelope = () => setIsEnvelopeOpen(!isEnvelopeOpen);

  const handleImageUpload = (e) => {
    if (isViewMode) return;
    
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsLoading(true);

    const imagePromises = files.map(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            resolve(event.target.result);
          };
          reader.readAsDataURL(file);
        })
    );

    Promise.all(imagePromises).then((images) => {
      setUserImages((prev) => [...prev, ...images].slice(0, 6));
      setIsLoading(false);
    });
  };

  const triggerFileInput = () => {
    if (!isViewMode) {
      fileInputRef.current.click();
    }
  };

  const removeImage = (index) => {
    if (!isViewMode) {
      setUserImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleShare = () => {
    if (userImages.length === 0) {
      setSnackbar({
        open: true,
        message: 'Please add some images first!',
        severity: 'warning'
      });
      return;
    }
    setIsCardOpen(true);
  };

  const generateShareableId = async () => {
    try {
      setIsSharing(true);
      
      if (!wishText.trim()) {
        setSnackbar({
          open: true,
          message: 'Please enter your wish.',
          severity: 'warning'
        });
        return;
      }

      // Create message data structure
      const messageData = {
        type: 'memory_bouquet',
        bouquetIndex: currentBouquet,
        images: userImages,
        wishText: wishText.trim(),
        recipientName: recipientName.trim() || 'Friend',
        senderName: 'Anonymous', // You can modify this to get from user auth
        createdAt: new Date(),
        lastViewedAt: null,
        views: 0,
        status: 'active', // active, archived, deleted
        metadata: {
          imageCount: userImages.length,
          bouquetType: `bouquet_${currentBouquet + 1}`,
          platform: 'web'
        }
      };

      // Save to 'messages' collection
      const docRef = await addDoc(collection(db, 'messages'), messageData);
      const newShareUrl = `${window.location.origin}/flower/share/${docRef.id}`;
      setShareUrl(newShareUrl);
      
      setSnackbar({
        open: true,
        message: 'Shareable link created successfully!',
        severity: 'success'
      });

    } catch (error) {
      console.error('Error creating shareable bouquet:', error);
      setSnackbar({
        open: true,
        message: 'Error creating shareable link. Please try again.',
        severity: 'error'
      });
    } finally {
      setIsSharing(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setSnackbar({
        open: true,
        message: 'Link copied to clipboard!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      setSnackbar({
        open: true,
        message: 'Failed to copy link.',
        severity: 'error'
      });
    }
  };

  const handleSendWish = async () => {
    await generateShareableId();
  };

  const handleCloseCard = () => {
    setIsCardOpen(false);
    setShareUrl('');
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const createNewBouquet = () => {
    navigate('/flower');
    window.location.reload();
  };

  return (
    <>
      <Navbar />
      <Container>
        {showConfetti && (
          <Confetti
            width={width}
            height={height}
            recycle={false}
            style={{ position: 'fixed', top: 0, left: 0, zIndex: 2000 }}
            numberOfPieces={150}
          />
        )}

        <Typography
          variant="h4"
          sx={{
            fontFamily: '"Indie Flower", cursive',
            color: '#d63384',
            marginBottom: 2
          }}
        >
          {isViewMode ? 'Shared Memory Bouquet!' : 'Memory Bouquet!'}
        </Typography>

        {isViewMode && sharedData && (
          <Paper
            sx={{
              padding: 2,
              marginBottom: 3,
              backgroundColor: '#fff3e0',
              borderRadius: 3
            }}
          >
            <Typography variant="h6" sx={{ fontFamily: '"Indie Flower", cursive', color: '#ff6f00' }}>
              💌 Message for {sharedData.recipientName}
            </Typography>
            <Typography sx={{ fontFamily: '"Indie Flower", cursive', marginTop: 1 }}>
              "{sharedData.wishText}"
            </Typography>
            <Typography variant="caption" sx={{ color: '#666', marginTop: 1, display: 'block' }}>
              From: {sharedData.senderName}
            </Typography>
            {sharedData.views > 0 && (
              <Typography variant="caption" sx={{ color: '#999', marginTop: 0.5, display: 'block' }}>
                Viewed {sharedData.views} {sharedData.views === 1 ? 'time' : 'times'}
              </Typography>
            )}
          </Paper>
        )}

        <BouquetWrapper>
          <BouquetImage
            src={bouquets[currentBouquet]}
            alt={`Bouquet ${currentBouquet + 1}`}
            onClick={toggleEnvelope}
            as={motion.img}
            animate={controls}
            initial={{ scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.03 }}
          />
          <FlowersContainer>
            {flowerPositions.map((pos, idx) => (
              <FlowerBox
                key={idx}
                style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
                layoutId={`flower-box-${idx}`}
                whileHover={{ scale: isViewMode ? 1.1 : 1.2 }}
                whileTap={{ scale: 0.95 }}
              >
                {userImages[idx] ? (
                  <>
                    <img
                      src={userImages[idx]}
                      alt={`User flower ${idx + 1}`}
                      style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                      onClick={() => setSnackbar({
                        open: true,
                        message: 'Beautiful memory! 🌸',
                        severity: 'info'
                      })}
                    />
                    {!isViewMode && (
                      <IconButton
                        size="small"
                        aria-label="Remove image"
                        onClick={() => removeImage(idx)}
                        sx={{
                          position: 'absolute',
                          top: 2,
                          right: 2,
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          '&:hover': { backgroundColor: '#f8bbd0' },
                          zIndex: 10
                        }}
                      >
                        <FavoriteIcon sx={{ color: '#d63384', fontSize: 18 }} />
                      </IconButton>
                    )}
                  </>
                ) : (
                  <Tooltip title={isViewMode ? "Memory slot" : "Add your photo here"}>
                    <Box
                      onClick={triggerFileInput}
                      sx={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        backgroundColor: isViewMode ? '#f0f0f0' : '#fce4ec',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: isViewMode ? 'default' : 'pointer',
                        color: isViewMode ? '#999' : '#d63384'
                      }}
                    >
                      <AddPhotoAlternateIcon fontSize="large" />
                    </Box>
                  </Tooltip>
                )}
                <Caption>{`Flower ${idx + 1}`}</Caption>
              </FlowerBox>
            ))}
          </FlowersContainer>
        </BouquetWrapper>

        <Box mt={3} display="flex" justifyContent="center" gap={2}>
          <IconButton
            aria-label="Previous bouquet"
            onClick={handlePrev}
            disabled={isViewMode}
            sx={{ 
              bgcolor: isViewMode ? '#f5f5f5' : '#fce4ec', 
              color: isViewMode ? '#999' : '#d63384' 
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton
            aria-label="Next bouquet"
            onClick={handleNext}
            disabled={isViewMode}
            sx={{ 
              bgcolor: isViewMode ? '#f5f5f5' : '#fce4ec', 
              color: isViewMode ? '#999' : '#d63384' 
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>

        {!isLoading && (
          <input
            type="file"
            id="image-upload"
            name="imageUpload"
            multiple
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleImageUpload}
            disabled={isViewMode}
          />
        )}

        <Box mt={3}>
          {isViewMode ? (
            <CuteShareButton
              variant="contained"
              onClick={createNewBouquet}
              startIcon={<AddPhotoAlternateIcon />}
            >
              Create Your Own Bouquet
            </CuteShareButton>
          ) : (
            <CuteShareButton
              variant="contained"
              onClick={handleShare}
              disabled={isLoading}
              startIcon={<ShareIcon />}
              aria-label="Share bouquet"
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Share Bouquet'}
            </CuteShareButton>
          )}
        </Box>

        <Modal open={isCardOpen} onClose={handleCloseCard} aria-labelledby="share-card-title">
          <ModalBox>
            <Typography
              id="share-card-title"
              variant="h6"
              sx={{ fontFamily: '"Indie Flower", cursive', color: '#d63384' }}
            >
              {shareUrl ? '🎉 Bouquet Ready to Share!' : 'Write Your Wish'}
            </Typography>
            
            {!shareUrl ? (
              <>
                <TextField
                  id="recipient-name"
                  name="recipientName"
                  label="Recipient's Name"
                  variant="outlined"
                  fullWidth
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Optional"
                  size="small"
                  sx={{ fontFamily: '"Indie Flower", cursive' }}
                />
                <TextField
                  id="wish-text"
                  name="wishText"
                  label="Your Wish"
                  variant="outlined"
                  fullWidth
                  multiline
                  minRows={3}
                  value={wishText}
                  onChange={(e) => setWishText(e.target.value)}
                  placeholder="Enter your heartfelt message here..."
                  size="small"
                  sx={{ fontFamily: '"Indie Flower", cursive' }}
                />
                <Box display="flex" justifyContent="space-between" mt={1}>
                  <Button variant="outlined" color="secondary" onClick={handleCloseCard}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSendWish}
                    disabled={isSharing}
                    sx={{ fontFamily: '"Indie Flower", cursive' }}
                  >
                    {isSharing ? <CircularProgress size={24} /> : 'Create Share Link'}
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Your bouquet is ready! Share this link:
                </Typography>
                <ShareUrlBox>
                  <Typography
                    variant="body2"
                    sx={{
                      flex: 1,
                      wordBreak: 'break-all',
                      fontSize: '0.85rem'
                    }}
                  >
                    {shareUrl}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={copyToClipboard}
                    sx={{ color: '#d63384' }}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </ShareUrlBox>
                <Box display="flex" justifyContent="center" mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCloseCard}
                    sx={{ fontFamily: '"Indie Flower", cursive' }}
                  >
                    Done
                  </Button>
                </Box>
              </>
            )}
          </ModalBox>
        </Modal>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default Flower;