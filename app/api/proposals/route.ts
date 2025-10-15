import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

type IncomingProposal = {
  title: string
  summary: string
  detail: string
  contact?: string
}

type StoredProposal = IncomingProposal & {
  id: string
  createdAt: string
  status: "queued"
}

const dataDir = path.join(process.cwd(), "data")
const filePath = path.join(dataDir, "proposals.json")

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<IncomingProposal>
    const title = (body.title || "").toString().trim()
    const summary = (body.summary || "").toString().trim()
    const detail = (body.detail || "").toString().trim()
    const contact = (body.contact || "").toString().trim() || undefined

    if (!title || !summary || !detail) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    if (title.length > 140 || summary.length > 280 || detail.length > 8000) {
      return NextResponse.json({ error: "Field too long" }, { status: 400 })
    }

    const record: StoredProposal = {
      id: `draft_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
      title,
      summary,
      detail,
      contact,
      createdAt: new Date().toISOString(),
      status: "queued",
    }

    await fs.mkdir(dataDir, { recursive: true })
    let list: StoredProposal[] = []
    try {
      const buf = await fs.readFile(filePath, "utf8")
      list = JSON.parse(buf)
      if (!Array.isArray(list)) list = []
    } catch {
      list = []
    }
    list.push(record)
    await fs.writeFile(filePath, JSON.stringify(list, null, 2), "utf8")

    return NextResponse.json({ ok: true, id: record.id })
  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}

export async function GET() {
  try {
    const buf = await fs.readFile(filePath, "utf8")
    const list = JSON.parse(buf)
    return NextResponse.json({ count: Array.isArray(list) ? list.length : 0 })
  } catch {
    return NextResponse.json({ count: 0 })
  }
}

