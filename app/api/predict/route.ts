import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Get the form data from the request
    const formData = await request.formData()
    const image = formData.get("image") as File

    if (!image) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 })
    }

    // Validate file type
    if (!image.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image" }, { status: 400 })
    }

    // Mock prediction logic - in a real app, this would call your ML model
    const mockDefects = ["Hollow Heart", "Black Spot", "Common Scab", "Greening", "Healthy"]

    const randomDefect = mockDefects[Math.floor(Math.random() * mockDefects.length)]
    const randomConfidence = 0.75 + Math.random() * 0.24 // Between 0.75 and 0.99

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      class: randomDefect,
      confidence: Number.parseFloat(randomConfidence.toFixed(2)),
    })
  } catch (error) {
    console.error("Error processing image:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
