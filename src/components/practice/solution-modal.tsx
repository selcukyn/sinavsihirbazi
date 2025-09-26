"use client"

import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { getSolutionAction } from "@/app/actions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Bot } from "lucide-react"
import type { Question, Subject } from "@/lib/types"
import { Button } from "../ui/button"
import { Sparkles, Loader2 } from "lucide-react"

interface SolutionModalProps {
  question: Question
  subject: Subject | "ales"
}

export function SolutionModal({ question, subject }: SolutionModalProps) {
  const [solution, setSolution] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Soru değiştiğinde mevcut durumu sıfırla
    if (!isOpen) {
      setSolution(null)
      setError(null)
      setIsLoading(false)
    }
  }, [isOpen, question.id])

  const handleFetchSolution = async () => {
    if (solution || isLoading || error) return

    setIsLoading(true)
    setError(null)

    // Pass the correct subject type to the action
    const result = await getSolutionAction({ question })

    if (result.success) {
      setSolution(result.solution)
    } else {
      setError(
        result.error ?? "Çözüm getirilirken bilinmeyen bir hata oluştu."
      )
    }
    setIsLoading(false)
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (open && !solution && !error) {
      handleFetchSolution()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-full">
          <Sparkles className="h-4 w-4 mr-2 text-yellow-400" />
          Soruyu Çöz
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">
            Soru Çözümü
          </DialogTitle>
          <DialogDescription>
            Bu sorunun yapay zeka tarafından oluşturulan adım adım çözümü
            aşağıdadır.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto flex-grow pr-6 -mr-6">
          {isLoading && (
            <div className="flex flex-col items-center justify-center space-y-4 h-full min-h-[200px]">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-center text-muted-foreground">
                Çözüm oluşturuluyor, lütfen bekleyin...
              </p>
            </div>
          )}
          {error && (
            <Alert variant="destructive">
              <Bot className="h-4 w-4" />
              <AlertTitle>Bir Hata Oluştu</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {solution && (
            <div className="prose prose-invert prose-sm sm:prose-base max-w-none text-foreground/90">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => (
                    <h1
                      className="text-xl font-bold text-green-400 mb-4"
                      {...props}
                    />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong className="font-bold text-foreground" {...props} />
                  ),
                }}
              >
                {solution}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
