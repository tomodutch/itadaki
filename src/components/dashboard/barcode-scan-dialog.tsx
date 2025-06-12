"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DialogHeader, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { BrowserMultiFormatReader, DecodeHintType, BarcodeFormat } from '@zxing/library';
import { useEffect, useRef, useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BarcodeScanDialogProps {
    open: boolean;
    setOpen: (state: boolean) => void;
    onResult: (code: string) => void
}

export function BarcodeScanDialog(props: BarcodeScanDialogProps) {
    const { cameras, loading, error } = useCameras();
    const [manualBarcode, setManualBarcode] = useState("");
    const [deviceId, setDeviceId] = useState<string | null>(null);
    const [useFile, setUseFile] = useState(false);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const codeReader = new BrowserMultiFormatReader();
        try {
            const img = new Image();
            img.src = URL.createObjectURL(file);

            img.onload = async () => {
                try {
                    const result = await codeReader.decodeFromImage(img);
                    if (result) {
                        props.onResult(result.getText());
                    } else {
                        alert('No barcode found in the image.');
                    }
                } catch (err) {
                    alert('Failed to decode barcode from image.');
                    console.error(err);
                }
            };
        } catch (e) {
            console.error('❌ Failed to decode from image file:', e);
        }
    };

    return (
        <Dialog
            open={props.open}
            onOpenChange={(state) => props.setOpen(state)}
        >
            <DialogContent className="w-full h-full sm:max-w-full sm:max-h-full lg:max-w-[60vw] lg:max-h-[80vh] overflow-auto">
                <DialogHeader>
                    <DialogTitle>Scan Barcode</DialogTitle>
                </DialogHeader>

                <div className="mb-4">
                    <Button onClick={() => setUseFile(prev => !prev)} variant="secondary" >
                        {useFile ? 'Use Camera Instead' : 'Upload Image Instead'}
                    </Button>
                </div>

                {useFile ? (
                    <>
                        <div className="grid w-full max-w-sm items-center gap-3">
                            <Label htmlFor="picture">Picture</Label>
                            <Input id="picture" type="file" onChange={handleFileUpload} />
                        </div>
                    </>
                ) : (
                    <>
                        {deviceId && (
                            <BarcodeScanner
                                deviceId={deviceId}
                                onResult={(result) => {
                                    props.onResult(result);
                                }}
                            />
                        )}

                        <Select onValueChange={(value) => setDeviceId(value)} value={deviceId || undefined}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={loading ? "Loading cameras..." : "Select a camera"} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Camera</SelectLabel>
                                    {!loading && cameras.map(camera => (
                                        <SelectItem value={camera.deviceId} key={camera.deviceId}>
                                            {camera.label || `Camera ${camera.deviceId}`}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {error && <p style={{ color: 'red' }}>Error fetching cameras: {String(error)}</p>}
                    </>
                )}

                <div className="grid w-full">
                    <Label htmlFor="barcodeinput">Or type in the barcode</Label>
                    <Input id="barcodeinput" type="text" value={manualBarcode} onChange={(val) => setManualBarcode(val.currentTarget.value)} />
                    <Button onClick={() => {props.onResult(manualBarcode)}}>Ok</Button>
                </div>

                <DialogFooter>
                    <Button onClick={() => props.setOpen(false)} variant="outline">
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

type BarcodeScannerProps = {
    deviceId: string;
    onResult: (code: string) => void;
};

function BarcodeScanner({ onResult, deviceId }: BarcodeScannerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [error, setError] = useState<string | null>(null);
    const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);

    useEffect(() => {
        const startScanner = async () => {
            if (!videoRef.current) {
                setError("Video element not ready");
                return;
            }

            const hints = new Map();
            hints.set(DecodeHintType.POSSIBLE_FORMATS, [
                BarcodeFormat.EAN_13,
                BarcodeFormat.UPC_A,
            ]);

            const codeReader = new BrowserMultiFormatReader(hints);
            codeReaderRef.current = codeReader;

            try {
                await codeReader.decodeFromVideoDevice(
                    deviceId,
                    videoRef.current,
                    (result, err) => {
                        if (result) {
                            onResult(result.getText());
                            codeReader.reset(); // Stop scanning after success
                        } else if (err && !err.name.startsWith("NotFoundException")) {
                            console.error('Decode error:', err);
                        }
                    }
                );
            } catch (e) {
                setError('Camera access failed or scanning error.');
                console.error(e);
            }
        };

        startScanner();

        return () => {
            codeReaderRef.current?.reset();
        };
    }, [deviceId, onResult]);

    return (
        <div>
            <video ref={videoRef} style={{ width: '100%', maxHeight: '400px' }} muted autoPlay />
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

function useCameras() {
    const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        const fetchCameras = async () => {
            try {
                setLoading(true);
                await navigator.mediaDevices.getUserMedia({ video: true });
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoInputs = devices.filter(device => device.kind === 'videoinput');
                setCameras(videoInputs);
            } catch (e) {
                setError(e);
                console.error('Error fetching cameras:', e);
            } finally {
                setLoading(false);
            }
        };

        fetchCameras();
    }, []);

    return { cameras, loading, error };
}
