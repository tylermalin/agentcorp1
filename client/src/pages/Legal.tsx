/**
 * /legal: 3.0 Legal. 3.1 Disclaimer and 3.2 MIT License.
 * Footer links deep-link to #disclaimer and #license.
 */
import { useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { CodeFrame, Container, IndexedRows, Note, PageHeader, Section } from "@/components/site/Primitives";
import { GITHUB_URL, LEGAL_DISCLAIMER } from "@/lib/site";

const LICENSE_TEXT = `MIT License

Copyright (c) 2026 AgentsCorp

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

const DISCLAIMER_ROWS = [
  {
    idx: "3.1.1",
    title: "Software and templates only",
    body: "AgentsCorp provides software tools, protocol specifications, and starting-point document templates. Templates are not a substitute for advice from counsel who knows your facts.",
  },
  {
    idx: "3.1.2",
    title: "Not a law firm, registered agent, or financial institution",
    body: "AgentsCorp does not provide legal advice, registered agent services, tax advice, or licensed banking or brokerage services, and nothing on this site creates an attorney-client relationship.",
  },
  {
    idx: "3.1.3",
    title: "Formation requires real-world filings",
    body: "A legally recognized LLC or series requires a Delaware Certificate of Formation (and series designations under 6 Del. C. § 18-215), a registered agent, an IRS EIN, and authorized signatories. On-chain records and Arweave anchors link to those filings; they do not replace them. Opening financial accounts depends on approval by the relevant institutions.",
  },
  {
    idx: "3.1.4",
    title: "Pre-mainnet status",
    body: "Smart contracts are not deployed to mainnet; target is Q1 2027. Contract interfaces, addresses, fees, and fee splits described on this site are planned parameters and may change before deployment.",
  },
];

export default function Legal() {
  // wouter ignores the hash on client-side navigation, so scroll to it ourselves.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const t = window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ block: "start" }), 50);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-black text-[#fafafa]">
      <Nav />
      <main id="main">
        <Container>
          <PageHeader
            index="3.0 Legal"
            title="Legal"
            lede="The disclaimer that applies to everything on agentscorp.xyz, and the license for the open-source code behind it."
          />

          <Section
            id="disclaimer"
            index="3.1 / Disclaimer"
            title="What AgentsCorp is, and is not"
            intro="Read this before relying on any template, specification, or contract described on this site."
          >
            <IndexedRows rows={DISCLAIMER_ROWS} />
            <Note className="mt-8">{LEGAL_DISCLAIMER}</Note>
          </Section>

          <Section
            id="license"
            index="3.2 / MIT License"
            title="Open source under MIT"
            intro={
              <>
                The site, documentation, and agent specification in{" "}
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-white underline-offset-4 hover:underline">
                  the GitHub repository
                </a>{" "}
                are released under the MIT License. The license covers the software; it does not grant legal advice or
                warrant any document for a particular use.
              </>
            }
          >
            <CodeFrame title="LICENSE" meta="MIT" code={LICENSE_TEXT} />
            <p className="mt-6 text-sm text-[#a3a3a3]">
              Questions about using the templates?{" "}
              <a href="/#access" className="text-[#6ee7b7] hover:text-[#a7f3d0]">
                Get in touch through early access
              </a>
              .
            </p>
          </Section>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
