import React, { useState, useRef } from 'react';
import Navbar from "./navbar";
import {
 Camera,
 Heart,
 Plus,
 BookOpen,
 Image,
 Album,
 Palette,
 LayoutGrid,
 Calendar,
 Flower2
} from 'lucide-react';

const Scrapbook = () => {
 const [memories, setMemories] = useState([]);
 const [photos, setPhotos] = useState([]);
 const [title, setTitle] = useState('Scrapbook');
 const [isProcessing, setIsProcessing] = useState(false);
 const [showMemoryDialog, setShowMemoryDialog] = useState(false);
 const [currentMemory, setCurrentMemory] = useState(null);
 const fileInputRef = useRef(null);

 // Aesthetic color palettes
 const colorPalettes = {
 pastel: ['#F8B195', '#F67280', '#C06C84', '#6C5B7B', '#355C7D'],
 earthy: ['#D4B483', '#C1666B', '#48A9A6', '#4281A4', '#363636']
 };

 // Memory themes with different layouts
 const memoryThemes = [
 {
 name: 'Pastel Dreams',
 layout: 'grid',
 colors: colorPalettes.pastel,
 icon: <Flower2 size={20} />,
 description: 'Soft and dreamy grid with equal-sized photos'
 },
 {
 name: 'Earthy Tones',
 layout: 'vertical',
 colors: colorPalettes.earthy,
 icon: <Album size={20} />,
 description: 'Natural tones with vertical photo scrolling'
 }
 ];

 const [selectedTheme, setSelectedTheme] = useState(memoryThemes[0]);

 // Handle photo uploads
 const handlePhotoUpload = (e) => {
 const files = Array.from(e.target.files);
 if (files.length < 5) {
 alert('Please upload at least 5 photos to create beautiful memories!');
 return;
 }
 setPhotos(files.map(file => ({
 id: Date.now() + Math.random(),
 url: URL.createObjectURL(file),
 date: new Date().toLocaleDateString('en-US', { 
 month: 'short', 
 day: 'numeric', 
 year: 'numeric' 
 })
 })));
 };

 // Create memory collage
 const createMemoryCollage = () => {
 if (photos.length < 5) {
 alert('Please upload at least 5 photos to create memories!');
 return;
 }

 setIsProcessing(true);
 
 setTimeout(() => {
 const newMemory = {
 id: Date.now(),
 title: title || 'Scrapbook',
 photos: [...photos],
 theme: selectedTheme,
 createdAt: new Date().toLocaleDateString('en-US', { 
 month: 'long', 
 day: 'numeric', 
 year: 'numeric' 
 }),
 coverPhoto: photos[Math.floor(Math.random() * photos.length)].url
 };

 setMemories([newMemory, ...memories]);
 setPhotos([]);
 setTitle('Scrapbook');
 setIsProcessing(false);
 }, 2000);
 };

 // Render photo grid based on selected theme
 const renderPhotoGrid = (memory) => {
 if (memory.theme.name === 'Pastel Dreams') {
 return (
 <div style={styles.photoGrid}>
 {memory.photos.slice(0, 9).map((photo, index) => (
 <div
 key={photo.id}
 style={{
 ...styles.photoGridItem,
 animationDelay: `${index * 0.1}s`
 }}
 >
 <img 
 src={photo.url} 
 alt={`Memory ${index}`}
 style={styles.photoImage}
 />
 </div>
 ))}
 {memory.photos.length > 9 && (
 <div 
 style={{
 ...styles.photoGridItem,
 backgroundColor: memory.theme.colors[3] + '40',
 color: memory.theme.colors[4],
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 fontSize: '1.2rem',
 fontWeight: 'bold'
 }}
 >
 +{memory.photos.length - 9}
 </div>
 )}
 </div>
 );
 } else { // Earthy Tones
 return (
 <div style={styles.photoGrid}>
 {memory.photos.slice(0, 9).map((photo, index) => (
 <div
 key={photo.id}
 style={{
 ...styles.photoGridItem,
 animationDelay: `${index * 0.1}s`
 }}
 >
 <img 
 src={photo.url} 
 alt={`Memory ${index}`}
 style={styles.photoImage}
 />
 </div>
 ))}
 {memory.photos.length > 9 && (
 <div 
 style={{
 ...styles.photoGridItem,
 backgroundColor: memory.theme.colors[3] + '40',
 color: memory.theme.colors[4],
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 fontSize: '1.2rem',
 fontWeight: 'bold'
 }}
 >
 +{memory.photos.length - 9}
 </div>
 )}
 </div>
 );
 }
 };

 const styles = {
 container: {
 minHeight: '100vh',
 background: `linear-gradient(135deg, ${selectedTheme.colors[0]}20 0%, ${selectedTheme.colors[1]}20 50%, ${selectedTheme.colors[2]}20 100%)`,
 padding: '2rem',
 fontFamily: '"Poppins", "Helvetica", sans-serif',
 position: 'relative',
 overflow: 'hidden'
 },
 headerContainer: {
 maxWidth: '1200px',
 margin: '0 auto 2rem auto',
 position: 'relative'
 },
 headerTop: {
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'space-between',
 marginBottom: '2rem',
 flexWrap: 'wrap',
 gap: '1rem'
 },
 headerLeft: {
 display: 'flex',
 alignItems: 'center',
 gap: '1rem'
 },
 headerIcon: {
 animation: 'spin 20s linear infinite'
 },
 headerTitle: {
 fontSize: '2.5rem',
 fontWeight: 600,
 background: `linear-gradient(45deg, ${selectedTheme.colors[3]}, ${selectedTheme.colors[4]})`,
 WebkitBackgroundClip: 'text',
 WebkitTextFillColor: 'transparent',
 lineHeight: 1.2,
 margin: 0
 },
 headerRight: {
 display: 'flex',
 gap: '1rem'
 },
 button: {
 display: 'flex',
 alignItems: 'center',
 gap: '0.5rem',
 padding: '0.75rem 1.5rem',
 borderRadius: '12px',
 border: 'none',
 cursor: 'pointer',
 fontSize: '1rem',
 fontWeight: 500,
 transition: 'all 0.2s ease',
 textDecoration: 'none'
 },
 primaryButton: {
 backgroundColor: selectedTheme.colors[3],
 color: 'white'
 },
 secondaryButton: {
 backgroundColor: 'transparent',
 color: selectedTheme.colors[4],
 border: `2px solid ${selectedTheme.colors[3]}`
 },
 uploadPreview: {
 backgroundColor: 'rgba(255, 255, 255, 0.9)',
 backdropFilter: 'blur(10px)',
 padding: '1.5rem',
 marginBottom: '2rem',
 borderRadius: '16px',
 border: `1px solid ${selectedTheme.colors[1]}40`,
 animation: 'fadeIn 0.3s ease-out',
 maxWidth: '800px',
 margin: '0 auto 2rem auto'
 },
 uploadTitle: {
 fontSize: '1.25rem',
 fontWeight: 600,
 marginBottom: '1rem',
 color: selectedTheme.colors[4],
 display: 'flex',
 alignItems: 'center',
 gap: '0.5rem'
 },
 photoPreviewContainer: {
 display: 'flex',
 gap: '8px',
 overflowX: 'auto',
 paddingBottom: '8px',
 marginBottom: '1.5rem'
 },
 photoPreviewItem: {
 minWidth: '80px',
 height: '80px',
 borderRadius: '8px',
 overflow: 'hidden',
 flexShrink: 0,
 position: 'relative'
 },
 coverBadge: {
 position: 'absolute',
 top: '4px',
 left: '4px',
 backgroundColor: selectedTheme.colors[3],
 color: 'white',
 borderRadius: '4px',
 padding: '2px 4px',
 fontSize: '0.7rem',
 fontWeight: 'bold'
 },
 textInput: {
 width: '100%',
 padding: '0.75rem',
 marginBottom: '1.5rem',
 borderRadius: '12px',
 border: `1px solid ${selectedTheme.colors[1]}60`,
 backgroundColor: 'rgba(255, 255, 255, 0.7)',
 fontSize: '1rem',
 outline: 'none',
 maxWidth: '100%'
 },
 progressContainer: {
 display: 'flex',
 alignItems: 'center',
 gap: '1rem'
 },
 progressBar: {
 flex: 1,
 height: '8px',
 borderRadius: '12px',
 backgroundColor: selectedTheme.colors[1] + '20',
 overflow: 'hidden'
 },
 progressFill: {
 height: '100%',
 backgroundColor: selectedTheme.colors[3],
 width: '60%',
 animation: 'pulse 1s ease-in-out infinite'
 },
 progressText: {
 color: selectedTheme.colors[4],
 minWidth: '100px',
 fontSize: '0.9rem'
 },
 mainContainer: {
 maxWidth: '1200px',
 margin: '0 auto',
 position: 'relative'
 },
 emptyState: {
 textAlign: 'center',
 padding: '4rem 1rem',
 maxWidth: '500px',
 margin: '0 auto',
 backgroundColor: 'rgba(255, 255, 255, 0.8)',
 borderRadius: '16px',
 backdropFilter: 'blur(10px)',
 border: `2px dashed ${selectedTheme.colors[1]}80`,
 animation: 'fadeIn 0.6s ease-out'
 },
 emptyIcon: {
 width: '100px',
 height: '100px',
 borderRadius: '50%',
 backgroundColor: selectedTheme.colors[0] + '20',
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 margin: '0 auto 1.5rem auto',
 border: `2px dashed ${selectedTheme.colors[1]}`,
 animation: 'float 4s ease-in-out infinite'
 },
 emptyTitle: {
 fontSize: '1.5rem',
 color: selectedTheme.colors[4],
 fontWeight: 600,
 marginBottom: '1rem'
 },
 emptyText: {
 fontSize: '1rem',
 color: selectedTheme.colors[4],
 marginBottom: '2rem',
 opacity: 0.8
 },
 memoriesGrid: {
 display: 'grid',
 gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
 gap: '1.5rem',
 padding: '1rem'
 },
 memoryCard: {
 borderRadius: '16px',
 backgroundColor: 'rgba(255, 255, 255, 0.9)',
 backdropFilter: 'blur(10px)',
 border: `1px solid ${selectedTheme.colors[1]}40`,
 overflow: 'hidden',
 cursor: 'pointer',
 transition: 'all 0.3s ease',
 display: 'flex',
 flexDirection: 'column',
 animation: 'fadeIn 0.5s ease-out',
 boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
 },
 memoryImage: {
 position: 'relative',
 height: '200px',
 overflow: 'hidden'
 },
 memoryImageOverlay: {
 position: 'absolute',
 bottom: 0,
 left: 0,
 right: 0,
 padding: '1rem',
 background: `linear-gradient(transparent, ${selectedTheme.colors[4]}80)`
 },
 memoryTitle: {
 color: 'white',
 fontWeight: 600,
 fontSize: '1.1rem',
 textShadow: '0 1px 3px rgba(0,0,0,0.3)',
 margin: 0
 },
 memoryTheme: {
 color: 'rgba(255,255,255,0.9)',
 fontWeight: 500,
 display: 'flex',
 alignItems: 'center',
 gap: '4px',
 fontSize: '0.8rem',
 margin: 0
 },
 memoryBadge: {
 position: 'absolute',
 top: '12px',
 right: '12px',
 backgroundColor: 'rgba(255,255,255,0.9)',
 borderRadius: '20px',
 padding: '4px 8px',
 display: 'flex',
 alignItems: 'center',
 gap: '4px'
 },
 memoryContent: {
 padding: '1rem',
 flexGrow: 1
 },
 memoryDate: {
 color: selectedTheme.colors[4],
 marginBottom: '0.5rem',
 display: 'flex',
 alignItems: 'center',
 gap: '4px',
 fontSize: '0.9rem'
 },
 memoryPreview: {
 height: '120px',
 borderRadius: '8px',
 overflow: 'hidden'
 },
 photoGrid: {
 display: 'grid',
 gridTemplateColumns: 'repeat(3, 1fr)',
 gap: '4px',
 height: '100%'
 },
 photoGridItem: {
 aspectRatio: '1/1',
 borderRadius: '4px',
 overflow: 'hidden',
 animation: 'fadeIn 0.5s ease-out'
 },
 photoHorizontal: {
 display: 'flex',
 gap: '4px',
 overflowX: 'auto',
 paddingBottom: '4px',
 height: '100%'
 },
 photoHorizontalItem: {
 minWidth: '100px',
 height: '100%',
 borderRadius: '4px',
 overflow: 'hidden',
 flexShrink: 0,
 animation: 'slideIn 0.5s ease-out'
 },
 photoImage: {
 width: '100%',
 height: '100%',
 objectFit: 'cover',
 transition: 'transform 0.3s ease'
 },
 modal: {
 position: 'fixed',
 top: 0,
 left: 0,
 right: 0,
 bottom: 0,
 backgroundColor: 'rgba(0, 0, 0, 0.5)',
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 zIndex: 1000,
 padding: '1rem'
 },
 modalContent: {
 backgroundColor: 'rgba(255,255,255,0.95)',
 backdropFilter: 'blur(10px)',
 borderRadius: '16px',
 maxWidth: '800px',
 width: '100%',
 overflow: 'hidden',
 animation: 'fadeIn 0.3s ease-out',
 maxHeight: '90vh'
 },
 modalHeader: {
 textAlign: 'center',
 color: selectedTheme.colors[4],
 fontWeight: 600,
 fontSize: '1.2rem',
 borderBottom: `1px solid ${selectedTheme.colors[1]}20`,
 backgroundColor: selectedTheme.colors[0] + '10',
 padding: '1.5rem'
 },
 modalBody: {
 padding: '1.5rem'
 },
 themeGrid: {
 display: 'grid',
 gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
 gap: '1rem'
 },
 themeCard: {
 padding: '1rem',
 borderRadius: '12px',
 cursor: 'pointer',
 border: '2px solid transparent',
 transition: 'all 0.3s ease',
 height: '100%'
 },
 themeCardSelected: {
 border: `2px solid ${selectedTheme.colors[3]}`
 },
 themeHeader: {
 display: 'flex',
 alignItems: 'center',
 gap: '0.5rem',
 marginBottom: '0.5rem'
 },
 themeIcon: {
 width: '24px',
 height: '24px',
 borderRadius: '6px',
 color: 'white',
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center'
 },
 themeTitle: {
 fontWeight: 600,
 fontSize: '1rem'
 },
 colorPalette: {
 display: 'flex',
 gap: '4px',
 marginBottom: '0.5rem'
 },
 colorSwatch: {
 width: '100%',
 height: '8px',
 borderRadius: '4px'
 },
 themeDescription: {
 fontSize: '0.8rem',
 fontStyle: 'italic'
 },
 detailModal: {
 maxWidth: '800px',
 width: '90%'
 },
 detailHeader: {
 padding: '1.5rem',
 borderBottom: `1px solid ${selectedTheme.colors[1]}20`,
 backgroundColor: selectedTheme.colors[0] + '10',
 display: 'flex',
 justifyContent: 'space-between',
 alignItems: 'center'
 },
 detailTitle: {
 display: 'flex',
 alignItems: 'center',
 gap: '0.5rem',
 fontWeight: 600,
 fontSize: '1.2rem'
 },
 detailDate: {
 fontSize: '0.9rem',
 opacity: 0.8
 },
 detailContent: {
 maxHeight: '60vh',
 overflowY: 'auto',
 padding: '1.5rem'
 },
 floatingButton: {
 position: 'fixed',
 bottom: '24px',
 right: '24px',
 zIndex: 1000,
 backgroundColor: selectedTheme.colors[3],
 color: 'white',
 borderRadius: '16px',
 padding: '12px 24px',
 fontSize: '1rem',
 border: 'none',
 cursor: 'pointer',
 boxShadow: `0 4px 12px ${selectedTheme.colors[3]}40`,
 transition: 'all 0.2s ease',
 display: 'flex',
 alignItems: 'center',
 gap: '0.5rem',
 animation: 'fadeIn 0.3s ease-out'
 }
 };

 return (
  <div>
    <Navbar/>
 <div style={styles.container}>
 <style>{`
 @keyframes fadeIn {
 from { opacity: 0; }
 to { opacity: 1; }
 }
 
 @keyframes slideIn {
 from { opacity: 0; transform: translateX(20px); }
 to { opacity: 1; transform: translateX(0); }
 }
 
 @keyframes spin {
 from { transform: rotate(0deg); }
 to { transform: rotate(360deg); }
 }
 
 @keyframes float {
 0%, 100% { transform: translateY(0px) scale(1) rotate(0deg); }
 25% { transform: translateY(-5px) scale(1.05) rotate(5deg); }
 75% { transform: translateY(5px) scale(1.05) rotate(-5deg); }
 }
 
 @keyframes pulse {
 0%, 100% { opacity: 1; }
 50% { opacity: 0.5; }
 }
 
 .memory-card:hover {
 transform: translateY(-5px);
 box-shadow: 0 8px 16px ${selectedTheme.colors[3]}20;
 }
 
 .memory-card:hover img {
 transform: scale(1.05);
 }
 
 .button:hover {
 transform: translateY(-2px);
 box-shadow: 0 4px 8px ${selectedTheme.colors[3]}40;
 }
 
 .floating-button:hover {
 transform: translateY(-2px);
 box-shadow: 0 6px 12px ${selectedTheme.colors[3]}60;
 }
 
 .theme-card:hover {
 transform: scale(1.03);
 }
 
 .photo-preview::-webkit-scrollbar,
 .photo-horizontal::-webkit-scrollbar {
 height: 6px;
 }
 
 .photo-preview::-webkit-scrollbar-thumb,
 .photo-horizontal::-webkit-scrollbar-thumb {
 background-color: ${selectedTheme.colors[2]}80;
 border-radius: 3px;
 }
 
 .detail-content::-webkit-scrollbar {
 width: 8px;
 }
 
 .detail-content::-webkit-scrollbar-thumb {
 background-color: ${selectedTheme.colors[2]}80;
 border-radius: 4px;
 }
 `}</style>

 {/* Header */}
 <div style={styles.headerContainer}>
 <div style={styles.headerTop}>
 <div style={styles.headerLeft}>
 <div style={styles.headerIcon}>
 <BookOpen size={32} color={selectedTheme.colors[3]} />
 </div>
 <h1 style={styles.headerTitle}>
 {title || 'My Scrapbook'}
 </h1>
 </div>

 <div style={styles.headerRight}>
 <button
 onClick={() => fileInputRef.current?.click()}
 style={{...styles.button, ...styles.primaryButton}}
 className="button"
 >
 <Image size={20} />
 Add Photos
 </button>
 <input
 type="file"
 accept="image/*"
 onChange={handlePhotoUpload}
 ref={fileInputRef}
 style={{ display: 'none' }}
 multiple
 />

 <button
 onClick={() => setShowMemoryDialog(true)}
 style={{...styles.button, ...styles.secondaryButton}}
 className="button"
 >
 <Palette size={20} />
 Themes
 </button>
 </div>
 </div>

 {/* Photo Upload Preview */}
 {photos.length > 0 && (
 <div style={styles.uploadPreview}>
 <h3 style={styles.uploadTitle}>
 <LayoutGrid size={20} /> {photos.length} Photos Selected
 </h3>

 <div style={styles.photoPreviewContainer} className="photo-preview">
 {photos.map((photo, index) => (
 <div key={photo.id} style={styles.photoPreviewItem}>
 <img 
 src={photo.url} 
 alt={`Preview ${index}`}
 style={styles.photoImage}
 />
 {index === 0 && (
 <div style={styles.coverBadge}>
 Cover
 </div>
 )}
 </div>
 ))}
 </div>

 <input
 type="text"
 placeholder="Name this memory..."
 value={title}
 onChange={(e) => setTitle(e.target.value)}
 style={styles.textInput}
 />

 {isProcessing ? (
 <div style={styles.progressContainer}>
 <div style={styles.progressBar}>
 <div style={styles.progressFill} />
 </div>
 <span style={styles.progressText}>
 Creating...
 </span>
 </div>
 ) : (
 <button
 onClick={createMemoryCollage}
 style={{...styles.button, ...styles.primaryButton, width: '100%', justifyContent: 'center', padding: '12px'}}
 className="button"
 >
 Create Memory Collage
 </button>
 )}
 </div>
 )}
 </div>

 {/* Memories Grid */}
 <div style={styles.mainContainer}>
 {memories.length === 0 && photos.length === 0 ? (
 <div style={styles.emptyState}>
 <div style={styles.emptyIcon}>
 <Camera size={40} color={selectedTheme.colors[3]} />
 </div>
 
 <h2 style={styles.emptyTitle}>
 Your Scrapbook Awaits
 </h2>
 <p style={styles.emptyText}>
 Upload at least 5 photos to create your first beautiful memory collage
 </p>
 
 <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <button
    onClick={() => fileInputRef.current?.click()}
    style={{ ...styles.button, ...styles.primaryButton }}
    className="button"
  >
    <Plus size={20} />
    Upload Photos
  </button>
</div>

 </div>
 ) : (
 <div style={styles.memoriesGrid}>
 {memories.map((memory) => (
 <div
 key={memory.id}
 style={{
 ...styles.memoryCard,
 borderColor: memory.theme.colors[1] + '40'
 }}
 className="memory-card"
 onClick={() => setCurrentMemory(memory)}
 >
 <div style={styles.memoryImage}>
 <img 
 src={memory.coverPhoto} 
 alt={memory.title}
 style={{...styles.photoImage, filter: 'brightness(0.95)'}}
 />
 <div style={{
 ...styles.memoryImageOverlay,
 background: `linear-gradient(transparent, ${memory.theme.colors[4]}80)`
 }}>
 <h3 style={styles.memoryTitle}>
 {memory.title}
 </h3>
 <p style={styles.memoryTheme}>
 {memory.theme.icon} {memory.theme.name}
 </p>
 </div>
 <div style={styles.memoryBadge}>
 <Image size={14} color={memory.theme.colors[4]} />
 <span style={{ 
 color: memory.theme.colors[4],
 fontWeight: 'bold',
 fontSize: '0.8rem'
 }}>
 {memory.photos.length}
 </span>
 </div>
 </div>
 
 <div style={styles.memoryContent}>
 <div style={{
 ...styles.memoryDate,
 color: memory.theme.colors[4]
 }}>
 <Calendar size={14} /> {memory.createdAt}
 </div>
 
 <div style={styles.memoryPreview}>
 {renderPhotoGrid(memory)}
 </div>
 </div>
 </div>
 ))}
 </div>
 )}
 </div>

 {/* Theme Selection Dialog */}
 {showMemoryDialog && (
 <div style={styles.modal} onClick={() => setShowMemoryDialog(false)}>
 <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
 <div style={styles.modalHeader}>
 Choose a Memory Theme
 </div>
 <div style={styles.modalBody}>
 <div style={styles.themeGrid}>
 {memoryThemes.map((theme) => (
 <div
 key={theme.name}
 style={{
 ...styles.themeCard,
 backgroundColor: theme.colors[0] + '10',
 ...(selectedTheme.name === theme.name ? styles.themeCardSelected : {})
 }}
 className="theme-card"
 onClick={() => {
 setSelectedTheme(theme);
 setShowMemoryDialog(false);
 }}
 >
 <div style={styles.themeHeader}>
 <div style={{
 ...styles.themeIcon,
 backgroundColor: theme.colors[3]
 }}>
 {theme.icon}
 </div>
 <span style={{
 ...styles.themeTitle,
 color: theme.colors[4]
 }}>
 {theme.name}
 </span>
 </div>
 
 <div style={styles.colorPalette}>
 {theme.colors.map((color, index) => (
 <div 
 key={index}
 style={{
 ...styles.colorSwatch,
 backgroundColor: color
 }}
 />
 ))}
 </div>
 
 <p style={{
 ...styles.themeDescription,
 color: theme.colors[4]
 }}>
 {theme.description}
 </p>
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>
 )}

 {/* Memory Detail Dialog */}
 {currentMemory && (
 <div style={styles.modal} onClick={() => setCurrentMemory(null)}>
 <div style={{...styles.modalContent, ...styles.detailModal}} onClick={(e) => e.stopPropagation()}>
 <div style={{
 ...styles.detailHeader,
 color: currentMemory.theme.colors[4],
 backgroundColor: currentMemory.theme.colors[0] + '10',
 borderColor: currentMemory.theme.colors[1] + '20'
 }}>
 <div style={styles.detailTitle}>
 {currentMemory.theme.icon}
 {currentMemory.title}
 </div>
 <div style={styles.detailDate}>
 {currentMemory.createdAt}
 </div>
 </div>
 <div style={styles.detailContent} className="detail-content">
 {renderPhotoGrid(currentMemory)}
 </div>
 </div>
 </div>
 )}

 {/* Floating Action Button */}
 {photos.length === 0 && memories.length > 0 && (
 <button
 onClick={() => fileInputRef.current?.click()}
 style={styles.floatingButton}
 className="floating-button"
 >
 <Plus size={24} />
 Add More Memories
 </button>
 )}
 </div>
 </div>
 );
};

export default Scrapbook;