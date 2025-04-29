"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, ImageIcon, Upload, Video, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function CourseMedia({ data, updateData }) {
  const [thumbnail, setThumbnail] = useState(data.thumbnail || null)
  const [previewVideo, setPreviewVideo] = useState(data.previewVideo || null)
  const [error, setError] = useState("")

  const thumbnailInputRef = useRef(null)
  const videoInputRef = useRef(null)

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.includes("image/")) {
      setError("Please upload an image file (JPEG, PNG, etc.)")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image file size must be less than 5MB")
      return
    }

    setError("")
    const url = URL.createObjectURL(file)
    setThumbnail({
      file,
      url,
      name: file.name,
      size: file.size,
    })

    updateData({
      thumbnail: {
        file,
        url,
        name: file.name,
        size: file.size,
      },
    })
  }

  const handleVideoChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.includes("video/")) {
      setError("Please upload a video file (MP4, MOV, etc.)")
      return
    }

    // Validate file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      setError("Video file size must be less than 100MB")
      return
    }

    setError("")
    const url = URL.createObjectURL(file)
    setPreviewVideo({
      file,
      url,
      name: file.name,
      size: file.size,
    })

    updateData({
      previewVideo: {
        file,
        url,
        name: file.name,
        size: file.size,
      },
    })
  }

  const removeThumbnail = () => {
    setThumbnail(null)
    updateData({ thumbnail: null })
    if (thumbnailInputRef.current) thumbnailInputRef.current.value = ""
  }

  const removeVideo = () => {
    setPreviewVideo(null)
    updateData({ previewVideo: null })
    if (videoInputRef.current) videoInputRef.current.value = ""
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-1">Course Media</h2>
        <p className="text-muted-foreground">Upload a course thumbnail and preview video to attract students.</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Course Thumbnail */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Course Thumbnail</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className={`border-2 ${thumbnail ? "border-solid" : "border-dashed"} rounded-lg p-4 flex flex-col items-center justify-center`}
            >
              {thumbnail ? (
                <div className="w-full space-y-4">
                  <div className="relative aspect-video bg-muted rounded-md overflow-hidden">
                    <img
                      src={thumbnail.url || "/placeholder.svg"}
                      alt="Course thumbnail preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="text-sm truncate max-w-[200px]">
                      <span className="font-medium">{thumbnail.name}</span>
                      <p className="text-xs text-muted-foreground">{formatFileSize(thumbnail.size)}</p>
                    </div>
                    <Button variant="outline" size="sm" className="text-red-500" onClick={removeThumbnail}>
                      <X className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium">Drop your image here or click to browse</p>
                    <p className="text-xs text-muted-foreground">
                      Recommended size: 1280x720px (16:9). Max file size: 5MB
                    </p>
                    <Button variant="outline" size="sm" onClick={() => thumbnailInputRef.current?.click()}>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Image
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <Input
              ref={thumbnailInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleThumbnailChange}
            />
            <div className="text-xs text-muted-foreground space-y-2">
              <p>A compelling thumbnail is crucial for attracting students.</p>
              <p>Use high-quality visuals that clearly represent your course content.</p>
            </div>
          </CardContent>
        </Card>

        {/* Course Preview Video */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Course Preview Video</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className={`border-2 ${previewVideo ? "border-solid" : "border-dashed"} rounded-lg p-4 flex flex-col items-center justify-center`}
            >
              {previewVideo ? (
                <div className="w-full space-y-4">
                  <div className="relative aspect-video bg-black rounded-md overflow-hidden">
                    <video src={previewVideo.url} controls className="w-full h-full object-contain" />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="text-sm truncate max-w-[200px]">
                      <span className="font-medium">{previewVideo.name}</span>
                      <p className="text-xs text-muted-foreground">{formatFileSize(previewVideo.size)}</p>
                    </div>
                    <Button variant="outline" size="sm" className="text-red-500" onClick={removeVideo}>
                      <X className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Video className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium">Drop your video here or click to browse</p>
                    <p className="text-xs text-muted-foreground">
                      Recommended length: 2-5 minutes. Max file size: 100MB
                    </p>
                    <Button variant="outline" size="sm" onClick={() => videoInputRef.current?.click()}>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Video
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <Input ref={videoInputRef} type="file" accept="video/*" className="hidden" onChange={handleVideoChange} />
            <div className="text-xs text-muted-foreground space-y-2">
              <p>A preview video gives potential students a taste of your teaching style.</p>
              <p>Focus on introducing yourself and explaining what students will learn.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
