import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavigationBar from "@/components/navigation/NavigationBar";
import { Card } from "@/components/ui/card";

declare global {
  interface Window {
    PICKAXE?: {
      pickaxes: { id: string; type: string }[];
      style?: string;
    };
  }
}

const AIChat = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/ai-chat") return;
    

    window.PICKAXE = {
      pickaxes: [{ id: "JLI_KI_L1_OMWIM", type: "inline" }],
      style: "kHsjoCQGgI0GWASmgIdIAxiDA6wgM6CMbgC4UgDDAXYEAvDIBoGEBgG4CAWQIGYBgwCqApdoEjggjIaCcCoCA9gGzOBUToIQygtAyDw4IGoGgCkxAAC6AQCsAAD4BILgJ6AkV0ALDQAFA+YiAkjEDFLoEEywHkKgMCHAzVmBfPMBUIIAaXQC7ggIDFAilWBXGkAmVIFVJQMYiAMEBBEoCF6QBJcgBREA7IAAaoAXEYCuQYBCNIAMWIAIIgBKgAAIgED6gAB6gEjwgCEcgCQRgCoJgC5pgAAhgDJugDYJgD87gK4lgEtQgBZBgHxCgHYQgC0pgACDgG5qgD1zgHtBgAl/gDoYgIJJgIuHgI9hgJQjgHEZgJs5gH15gKNNgFRVgImrgGNfgBVngJm5gEV3gC+hgEwqgA2kgAxIgFAUgM3dAOIAM4BY4ICIXC6AQAuAiBeAYBiACAyAUISAAWCABR6AXiiAULGAAHDAAAUgAKUwDCNQAgQDo0oAGEQAKIANCkAXMyAAIRAC9AgEAEQBEmYAmcUAcGiAVDjAAEhgAtFQBkJYB0bkAjxGASSRAFMmgAyDQCAA4AOI0AFQ2ANijAKxMgBLUQCNJ4APx0AlnuAOIJACVSgFERQBMIIAYKkAgbCAaULAASbgB9NQA55YAVKUAqgGAAKDAJDYgBuJQADQYAGhsAGCiAXAtAA+XgFFqQCJu4ASZkAwUQAQEAD5CAAChAAaMgGsJwCXC4BwIMAChCAYDRAECQgBhcQAUCIAbNUAVAWAK+hAC+DgAAEwAAioA6gkAbO6AQmNABYBgAK/wAFC4BaIEAgBKAcCZAKPQgHBTwD3c4BYPEAvmGAKMvAJGkgAx0QDq9YBxa0AVDKAeSzAIYqgGMxQCkoIBwWMAY1GAE+JAFqsgEFcwBOIoAEscAEAyABEFABoZgBw/QDi8YB140ATyKAOYNAHLjgHfzQBEBIADScAYQyAXE7ACEEgAATQBjWIAjUMAiK6AR8BN4ArrWAGT1gAImoACVeAMFYgAQhYAeDCAJOlgCC/oARuKAP4DgDD8IALWSANIQgBmSYAbxmAHncgAUhoAAAFAA=="
    };

    const { id: _fid } = window.PICKAXE.pickaxes[0];

    fetch(`https://embed.pickaxeproject.com/axe/api/script/${_fid}`)
      .then((res) => res.json())
      .then(({ v }) => {
        const scriptUrl = `https://cdn.jsdelivr.net/gh/pickaxeproject/cdn@${v}/dist/bundle.js`;

        if (!document.querySelector(`script[src="${scriptUrl}"]`)) {
          const script = document.createElement("script");
          script.src = scriptUrl;
          script.defer = true;
          script.id = "pickaxe-bundle";
          document.head.appendChild(script);
        }
      });

    return () => {
      document.querySelectorAll("#pickaxe-bundle, iframe, div").forEach((el) => {
        if (
          el.tagName === "IFRAME" &&
          (el as HTMLIFrameElement).src.includes("pickaxeproject")
        ) {
          el.remove();
        }
        if (el.id.includes("pickaxe")) {
          el.remove();
        }
      });
      delete window.PICKAXE;
    };
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/ai-chat") return;
  
    const style = document.createElement("style");
    style.innerHTML = `
      #pickaxe-inline-JLI_KI_L1_OMWIM button {
        font-family: "Arial", sans-serif !important;
        font-size: 16px !important;
        color: #282723 !important;
        background-color: #FFE94A !important;
        border-radius: 8px !important;
        padding: 10px 15px !important;
        border: none !important;
      }
  
      #pickaxe-inline-JLI_KI_L1_OMWIM button:hover {
        background-color: #F4D32F !important;
      }
    `;
  
    document.head.appendChild(style);
  
    return () => {
      document.head.removeChild(style);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/ai-chat") return;

    const applyCustomStyles = () => {
      const buttons = document.querySelectorAll(
        "#pickaxe-inline-JLI_KI_L1_OMWIM button"
      );
      buttons.forEach((btn) => {
        const button = btn as HTMLButtonElement;
        button.style.fontFamily = "Arial, sans-serif";
        button.style.fontSize = "16px";
        button.style.color = "#282723";
        button.style.backgroundColor = "#FFE94A";
        button.style.borderRadius = "8px";
        button.style.padding = "10px 15px";
        button.style.border = "none";
      });
    };

    setTimeout(applyCustomStyles, 3000);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <NavigationBar />
      <div className="h-[calc(100vh-64px)] pt-16">
        <div id="pickaxe-inline-JLI_KI_L1_OMWIM"></div>
      </div>
    </div>
  );
};

export default AIChat;
