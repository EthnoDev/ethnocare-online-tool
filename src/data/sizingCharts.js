export function getSizingChartPaths({ pathname, product, suspension, underlaySeal }) {
  const pdfs = {
    overlayTT: "/Sizing Charts/OVTT_SIZING-CHART_EN.pdf",
    overlayTF: "/Sizing Charts/OVTF_SIZING-CHART_EN.pdf",
    underlayTT: "/Sizing Charts/UDTT_SIZING-CHART_EN.pdf",
  };

  if (product === "Overlay") {
    if (pathname.startsWith("/sizing/TT") && pathname !== "/sizing/TTsuspension") {
      if (["TT-single-seal", "TT-multi-seal"].includes(suspension)) {
        pdfs.overlayTT = "/Sizing Charts/OVTT_SIZING-CHART-SEAL_EN.pdf";
      } else if ([
        "TT-locking", "TT-lanyard", "TT-cushion", "TT-suspension-sleeve",
      ].includes(suspension)) {
        pdfs.overlayTT = "/Sizing Charts/OVTT_SIZING-CHART-LOCKING_EN.pdf";
      }
    }

    if (pathname.startsWith("/sizing/TF") && pathname !== "/sizing/TFsuspension") {
      if (["TF-single-seal", "TF-multi-seal"].includes(suspension)) {
        pdfs.overlayTF = "/Sizing Charts/OVTF_SIZING-CHART-VAC_EN.pdf";
      } else if (["TF-distal-locking", "TF-lanyard", "TF-cushion"].includes(suspension)) {
        pdfs.overlayTF = "/Sizing Charts/OVTF_SIZING-CHART-PIN_EN.pdf";
      }
    }
  }

  if (
    product === "Underlay" &&
    pathname.startsWith("/sizing/underlay/") &&
    pathname !== "/sizing/underlay/seal"
  ) {
    if (underlaySeal === "open-seal") {
      pdfs.underlayTT = "/Sizing Charts/UDTT_SIZING-CHART-OPEN_EN.pdf";
    } else if (underlaySeal === "closed-seal") {
      pdfs.underlayTT = "/Sizing Charts/UDTT_SIZING-CHART-CLOSED_EN.pdf";
    }
  }

  return pdfs;
}
