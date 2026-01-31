import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Camera, X, ScanLine, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RecognitionResult {
  instrument: string;
  confidence: number;
  description: string;
  tips: string[];
}

interface InstrumentRecognizerProps {
  onRecognition?: (result: RecognitionResult) => void;
}

export function InstrumentRecognizer({ onRecognition }: InstrumentRecognizerProps) {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<RecognitionResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockResult: RecognitionResult = {
      instrument: "Digital Oscilloscope",
      confidence: 94,
      description: "A digital storage oscilloscope (DSO) used for viewing and analyzing electronic signal waveforms. This appears to be a 4-channel model with bandwidth of 100MHz.",
      tips: [
        "Set the VOLT/DIV knob to match your expected signal amplitude",
        "Adjust TIME/DIV for proper waveform display",
        "Use the trigger settings to stabilize your waveform",
        "Connect the probe ground clip to your circuit ground"
      ]
    };
    
    setResult(mockResult);
    setIsAnalyzing(false);
    onRecognition?.(mockResult);
  };

  const clearImage = () => {
    setImage(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <AnimatePresence mode="wait">
        {!image ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              "relative border-2 border-dashed border-border rounded-2xl p-12",
              "hover:border-primary/50 transition-colors cursor-pointer",
              "flex flex-col items-center justify-center gap-4"
            )}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
              <Upload size={28} className="text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="font-medium text-foreground">Upload instrument image</p>
              <p className="text-sm text-muted-foreground mt-1">
                Drag and drop or click to browse
              </p>
            </div>
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Upload size={16} />
                Browse Files
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Camera size={16} />
                Take Photo
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden bg-card border border-border">
              <img
                src={image}
                alt="Uploaded instrument"
                className="w-full h-64 object-contain bg-muted/30"
              />
              
              {/* Scanning overlay */}
              {isAnalyzing && (
                <motion.div
                  className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="relative w-full h-full">
                    <motion.div
                      className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
                      initial={{ top: 0 }}
                      animate={{ top: "100%" }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <ScanLine size={40} className="text-primary mx-auto mb-3 animate-pulse" />
                      <p className="font-medium text-foreground">Analyzing instrument...</p>
                      <p className="text-sm text-muted-foreground">AI is identifying the equipment</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Clear button */}
              <Button
                size="icon"
                variant="secondary"
                className="absolute top-3 right-3 w-8 h-8 rounded-full"
                onClick={clearImage}
              >
                <X size={16} />
              </Button>
            </div>

            {!result && !isAnalyzing && (
              <Button 
                className="w-full mt-4 bg-gradient-primary hover:opacity-90 text-primary-foreground gap-2"
                onClick={handleAnalyze}
              >
                <ScanLine size={18} />
                Analyze Instrument
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="rounded-2xl bg-card border border-border p-6 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 size={18} className="text-success" />
                  <span className="text-sm text-success font-medium">Identified</span>
                </div>
                <h3 className="text-xl font-display font-bold text-foreground">
                  {result.instrument}
                </h3>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{result.confidence}%</p>
                <p className="text-xs text-muted-foreground">Confidence</p>
              </div>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed">
              {result.description}
            </p>

            <div className="pt-4 border-t border-border">
              <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <AlertCircle size={16} className="text-accent" />
                Usage Tips
              </h4>
              <ul className="space-y-2">
                {result.tips.map((tip, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    {tip}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
