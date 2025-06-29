import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, StickyNote, SkipBack, SkipForward } from "lucide-react"
import { cn } from "@/lib/utils"

interface Note {
  id: string
  timestamp: number
  content: string
  createdAt: Date
}

interface VideoPlayerProps {
  videoUrl: string
  title: string
  duration: number
  onProgress?: (progress: number) => void
  initialProgress?: number
  courseId: string
  lessonId: string
}

export function VideoPlayer({ 
  videoUrl, 
  title, 
  duration, 
  onProgress, 
  initialProgress = 0,
  courseId,
  lessonId 
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [notes, setNotes] = useState<Note[]>([])
  const [newNote, setNewNote] = useState("")
  const [showNotes, setShowNotes] = useState(false)
  const [loading, setLoading] = useState(true)

  const controlsTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Set initial progress
    if (initialProgress > 0) {
      video.currentTime = (initialProgress / 100) * duration
    }

    const handleLoadedData = () => setLoading(false)
    const handleTimeUpdate = () => {
      const current = video.currentTime
      setCurrentTime(current)
      
      // Save progress
      const progress = (current / video.duration) * 100
      onProgress?.(progress)
      
      // Auto-save progress to localStorage
      localStorage.setItem(`video-progress-${courseId}-${lessonId}`, progress.toString())
    }

    const handleEnded = () => {
      setIsPlaying(false)
      onProgress?.(100)
    }

    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)
    }
  }, [duration, onProgress, courseId, lessonId, initialProgress])

  useEffect(() => {
    // Load saved notes
    const savedNotes = localStorage.getItem(`video-notes-${courseId}-${lessonId}`)
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes))
    }
  }, [courseId, lessonId])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    const newTime = (value[0] / 100) * video.duration
    video.currentTime = newTime
    setCurrentTime(newTime)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    const newVolume = value[0] / 100
    video.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleFullscreen = () => {
    const container = videoRef.current?.parentElement
    if (!container) return

    if (!isFullscreen) {
      container.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
    setIsFullscreen(!isFullscreen)
  }

  const changePlaybackRate = (rate: number) => {
    const video = videoRef.current
    if (!video) return

    video.playbackRate = rate
    setPlaybackRate(rate)
  }

  const skipTime = (seconds: number) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds))
  }

  const addNote = () => {
    if (!newNote.trim()) return

    const note: Note = {
      id: Date.now().toString(),
      timestamp: currentTime,
      content: newNote,
      createdAt: new Date()
    }

    const updatedNotes = [...notes, note]
    setNotes(updatedNotes)
    setNewNote("")

    // Save to localStorage
    localStorage.setItem(`video-notes-${courseId}-${lessonId}`, JSON.stringify(updatedNotes))
  }

  const jumpToNote = (timestamp: number) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = timestamp
    setCurrentTime(timestamp)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false)
    }, 3000)
  }

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <div 
          className="relative bg-black aspect-video group"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => isPlaying && setShowControls(false)}
        >
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full"
            onClick={togglePlay}
          />
          
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          )}

          {/* Controls Overlay */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300",
            showControls ? "opacity-100" : "opacity-0"
          )}>
            {/* Play/Pause Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                className="h-16 w-16 rounded-full bg-black/50 hover:bg-black/70 text-white"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
              </Button>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
              {/* Progress Bar */}
              <div className="flex items-center gap-2 text-white text-sm">
                <span>{formatTime(currentTime)}</span>
                <div className="flex-1">
                  <Progress 
                    value={(currentTime / duration) * 100} 
                    className="h-1 cursor-pointer"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect()
                      const percent = ((e.clientX - rect.left) / rect.width) * 100
                      handleSeek([percent])
                    }}
                  />
                </div>
                <span>{formatTime(duration)}</span>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => skipTime(-10)}>
                    <SkipBack className="h-4 w-4 text-white" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={togglePlay}>
                    {isPlaying ? <Pause className="h-4 w-4 text-white" /> : <Play className="h-4 w-4 text-white" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => skipTime(10)}>
                    <SkipForward className="h-4 w-4 text-white" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={toggleMute}>
                    {isMuted ? <VolumeX className="h-4 w-4 text-white" /> : <Volume2 className="h-4 w-4 text-white" />}
                  </Button>
                  <div className="w-20">
                    <Progress 
                      value={isMuted ? 0 : volume * 100} 
                      className="h-1"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Playback Speed */}
                  <select 
                    value={playbackRate}
                    onChange={(e) => changePlaybackRate(Number(e.target.value))}
                    className="bg-transparent text-white text-sm border border-white/20 rounded px-2 py-1"
                  >
                    <option value={0.5}>0.5x</option>
                    <option value={0.75}>0.75x</option>
                    <option value={1}>1x</option>
                    <option value={1.25}>1.25x</option>
                    <option value={1.5}>1.5x</option>
                    <option value={2}>2x</option>
                  </select>

                  <Dialog open={showNotes} onOpenChange={setShowNotes}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <StickyNote className="h-4 w-4 text-white" />
                      </Button>
                    </DialogTrigger>
                  </Dialog>

                  <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
                    <Maximize className="h-4 w-4 text-white" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Notes Dialog */}
      <Dialog open={showNotes} onOpenChange={setShowNotes}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Video Notes</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Add Note */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Current time: {formatTime(currentTime)}</span>
              </div>
              <Textarea
                placeholder="Add a note at current timestamp..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                rows={3}
              />
              <Button onClick={addNote} disabled={!newNote.trim()}>
                Add Note
              </Button>
            </div>

            {/* Notes List */}
            <div className="space-y-3">
              {notes.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No notes yet. Add your first note above!
                </p>
              ) : (
                notes.map((note) => (
                  <Card key={note.id} className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Button
                            variant="link"
                            className="p-0 h-auto text-sm font-medium text-rose-600"
                            onClick={() => jumpToNote(note.timestamp)}
                          >
                            {formatTime(note.timestamp)}
                          </Button>
                          <span className="text-xs text-muted-foreground">
                            {note.createdAt.toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm">{note.content}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const updatedNotes = notes.filter(n => n.id !== note.id)
                          setNotes(updatedNotes)
                          localStorage.setItem(`video-notes-${courseId}-${lessonId}`, JSON.stringify(updatedNotes))
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}