"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    id: "coforge",
    title: "Coforge Limited",
    category: "Jr. Associate - IT Infra",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    details: [
      "Created and maintained knowledge articles for Incident, Change, and Problem Management processes.",
      "Documented change plans including implementation steps, migration activities, and rollback procedures to ensure governance compliance.",
      "Administer and maintain Windows Server and Wintel environments, ensuring secure, stable, and high-performance operations across the enterprise.",
      "Successfully led CAB (Change Advisory Board) calls across multiple projects, ensuring smooth approvals and coordination with zero escalations or issues.",
      "Streamlined the change management process, reducing complaints and escalations by over 90%, while ensuring full compliance with governance policies.",
      "Partnered with cross-functional teams & stakeholders to plan, assess, and implement changes with minimal disruption, significantly improving change adoption and project success rates.",
      "Manage Active Directory for efficient user provisioning, access control, and group policy administration.",
      "Perform Incident, Change, and Problem Management in line with ITIL best practices, ensuring minimal service disruption and timely resolution.",
      "Deployed and configured 500+ Windows servers to support business-critical applications and infrastructure growth.",
      "Authored SOPs for Windows server provisioning, patching, and backup to standardise operations.",
      "Documented SOPs for incident handling and change rollbacks, ensuring SLA adherence.",
      "Conducted Root Cause Analysis (RCA) for recurring issues and created knowledge articles for prevention.",
      "Managed enterprise-wide Windows patch management activities, including monthly patch cycle coordination, testing, deployment, and rollback planning.",
      "Performed vulnerability remediation based on security advisories and vulnerability scan reports, ensuring compliance with organisational security standards.",
      "Coordinated with application and infrastructure teams to mitigate identified CVEs and reduce security risk exposure.",
      "Supported change management process for security patch deployments, ensuring minimal business impact and SLA adherence.",
      "Utilise ServiceNow (SNOW)/ OpsRamp/ManageEngine /Spiceworks and CyberArk for secure, efficient server creation, account management, change management, and privileged access control.",
      "Support infrastructure scalability by deploying virtual machines using VMware/Azure (basic) where required."
    ]
  },
  {
    id: "sla",
    title: "100% SLA Compliance",
    category: "Zero Breaches",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    details: [
      "Sustained 100% SLA compliance over 2 years with zero breaches.",
      "Delivered 100% adherence to SLA, KPI, and ITIL processes.",
      "Consistently commended by clients for maintaining a resilient IT environment and swift problem-solving."
    ]
  },
  {
    id: "glbajaj",
    title: "G.L. Bajaj Institute",
    category: "Bachelors of Business Administration",
    image: "/images/glbajaj-logo.png",
    details: [
      "President of Student Council: Led student activities and organized major events with notable guests.",
      "Placement Cell Head: Facilitated campus placements and company interactions.",
      "Graduated 2023."
    ]
  },
  {
    id: "pat-on-back",
    title: "Pat on the Back",
    category: "Award (2 Years)",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=800",
    details: [
      "Earned for 2 consecutive years.",
      "Reflects consistent client recognition for proactive issue resolution.",
      "Demonstrates excellence in service delivery and proactive support approach."
    ]
  },
];

export default function Projects() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedProject = projects.find(p => p.id === selectedId);

  return (
    <section className="bg-[#121212] py-32 px-8 md:px-24 text-white relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Experience & Achievements
          </h2>
          <p className="text-white/50 mt-4 text-lg max-w-xl">
            A snapshot of my professional journey in IT Infrastructure, ITSM operations, and academic leadership.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.div
              layoutId={`card-${project.id}`}
              onClick={() => setSelectedId(project.id)}
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-10%" }}
              className="group relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-md cursor-pointer"
            >
              <motion.div
                layoutId={`image-${project.id}`}
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 opacity-60 group-hover:opacity-100"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
              
              <motion.div 
                layoutId={`text-${project.id}`}
                className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 pointer-events-none"
              >
                <h3 className="text-3xl font-bold mb-2 text-white">
                  {project.title}
                </h3>
                <p className="text-white/70 uppercase tracking-widest text-sm font-semibold">
                  {project.category}
                </p>
              </motion.div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ring-1 ring-inset ring-white/20 rounded-3xl" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal / Expanded View */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />
            <motion.div
              layoutId={`card-${selectedProject.id}`}
              className="relative w-full max-w-2xl bg-[#1a1a1a] rounded-3xl overflow-hidden shadow-2xl z-10 border border-white/10 flex flex-col max-h-[90vh]"
            >
              <motion.div 
                layoutId={`image-${selectedProject.id}`}
                className="w-full h-64 md:h-80 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${selectedProject.image})` }}
              >
                 <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-black/20 to-transparent" />
                 <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 backdrop-blur-md transition-colors"
                 >
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                 </button>
              </motion.div>
              
              <div className="p-8 md:p-12 overflow-y-auto">
                <motion.div layoutId={`text-${selectedProject.id}`}>
                  <h3 className="text-4xl font-bold mb-2 text-white">
                    {selectedProject.title}
                  </h3>
                  <p className="text-white/50 uppercase tracking-widest text-sm font-semibold mb-8">
                    {selectedProject.category}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  <ul className="list-disc list-inside text-white/80 space-y-3 md:text-lg leading-relaxed marker:text-white/40">
                    {selectedProject.details.map((detail, idx) => (
                      <li key={idx}>
                        <span className="-ml-2">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
