import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./ui/Home";
import { lazy } from "react";
import { ThemeProvider } from "./components/theme-provider";

const NoMatch = lazy(() => import("@/ui/NoMatch"));
const TextEncrypt = lazy(() => import("@/ui/encrypt/TextEncrypt"));
const ImageEncrypt = lazy(() => import("@/ui/encrypt/ImageEncrypt"));
const VideoEncrypt = lazy(() => import("@/ui/encrypt/VideoEncrypt"));
const AudioEncrypt = lazy(() => import("@/ui/encrypt/AudioEncrypt"));
const TextDecrypt = lazy(() => import("@/ui/decrypt/TextDecrypt"));
const ImageDecrypt = lazy(() => import("@/ui/decrypt/ImageDecrypt"));
const VideoDecrypt = lazy(() => import("@/ui/decrypt/VideoDecrypt"));
const AudioDecrypt = lazy(() => import("@/ui/decrypt/AudioDecrypt"));

function App() {

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NoMatch />} />
          {/* Group route for encrypt */}
          <Route path="/encrypt/text" element={<TextEncrypt />} />
          <Route path="/encrypt/image" element={<ImageEncrypt />} />
          <Route path="/encrypt/video" element={<VideoEncrypt />} />
          <Route path="/encrypt/audio" element={<AudioEncrypt />} />
          {/* Group route for decrypt */}
          <Route path="/decrypt/text" element={<TextDecrypt />} />
          <Route path="/decrypt/image" element={<ImageDecrypt />} />
          <Route path="/decrypt/video" element={<VideoDecrypt />} />
          <Route path="/decrypt/audio" element={<AudioDecrypt />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App
