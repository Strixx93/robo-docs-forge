import { SidebarLayout } from '@/components/ui/sidebar-layout';
import { SectionCard } from '@/components/section-card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SafetyProtocols() {
  const sectionData = {
    title: 'Safety Protocols',
    type: 'text' as const,
    content: `# Safety Protocols

Safety is our top priority when working with robotic systems. Please follow these protocols at all times to ensure the safety of personnel and equipment.

## Emergency Procedures

### Immediate Response Actions

1. **Emergency Stop**: Always keep the emergency stop button within reach during operation
2. **Safe Zones**: Maintain designated safe zones around active robots (minimum 3-meter radius)
3. **Personal Protective Equipment**: Wear required safety gear including safety glasses and closed-toe shoes
4. **Communication**: Maintain clear communication with team members during operations

### Emergency Contact Information

- **Emergency Services**: 911
- **Security**: ext. 2345
- **Robotics Team Lead**: ext. 1234
- **Safety Officer**: ext. 5678

## Pre-Operation Checklist

Before operating any robotic system, complete this mandatory checklist:

### System Verification
- [ ] Verify emergency stop functionality
- [ ] Check sensor calibration status
- [ ] Confirm communication links are stable
- [ ] Review planned operation area for obstacles
- [ ] Ensure all safety barriers are in place

### Personnel Safety
- [ ] All operators wearing appropriate PPE
- [ ] Non-essential personnel cleared from work area
- [ ] Emergency procedures reviewed with team
- [ ] Backup operators identified and briefed

### Equipment Inspection
- [ ] Visual inspection of robot for damage
- [ ] Check all cables and connections
- [ ] Verify backup power systems
- [ ] Test manual override controls

## Operating Procedures

### Normal Operations

1. **Power-On Sequence**
   - Connect to robot control system
   - Run system diagnostics
   - Calibrate all sensors
   - Verify emergency stop functionality

2. **Movement Operations**
   - Clear work area of personnel
   - Announce robot movement intentions
   - Maintain visual contact with robot
   - Monitor for unexpected behavior

3. **Power-Down Sequence**
   - Return robot to safe position
   - Engage parking brake (if applicable)
   - Disconnect power safely
   - Complete operation log

### Restricted Operations

The following operations require additional safety measures:

- **High-Speed Movement**: Maximum speed limited to 0.5 m/s in shared spaces
- **Payload Handling**: Maximum payload of 50kg without special authorization
- **Outdoor Operations**: Weather conditions must be within operational limits
- **Night Operations**: Additional lighting and personnel required

## Incident Reporting

### Immediate Actions

1. Ensure all personnel are safe
2. Activate emergency stop if robot is still active
3. Secure the area to prevent further incidents
4. Contact safety officer immediately

### Documentation Requirements

All incidents must be documented within 24 hours including:

- Time and date of incident
- Personnel involved
- Description of what occurred
- Contributing factors
- Corrective actions taken
- Preventive measures for future

## Training Requirements

### Mandatory Training

All personnel operating robotic systems must complete:

- **Basic Robot Safety** (annual)
- **Emergency Response** (annual)
- **System-Specific Training** (per robot type)
- **Hands-On Certification** (practical test)

### Continuing Education

- Monthly safety briefings
- Quarterly emergency drills
- Annual safety protocol updates
- Incident analysis reviews

## Maintenance Safety

### Scheduled Maintenance

- Always disconnect power before maintenance
- Use lockout/tagout procedures
- Work in pairs during maintenance
- Document all maintenance activities

### Emergency Repairs

- Only authorized personnel may perform emergency repairs
- Coordinate with safety officer
- Use temporary safety barriers
- Complete incident report after repairs

## Compliance and Audits

This facility operates under the following safety standards:

- **OSHA 29 CFR 1910.212** - General requirements for all machines
- **ANSI/RIA R15.06** - Industrial robot safety standards
- **ISO 10218** - Robot safety requirements
- **Company Safety Policy 2024-RS-001**

Regular safety audits are conducted quarterly to ensure compliance with all applicable standards.

## Contact Information

For questions about safety protocols or to report safety concerns:

**Safety Officer**: safety@company.com
**Robotics Team**: robotics@company.com
**Emergency Hotline**: 1-800-SAFE-BOT`,
    updatedAt: '2024-01-13T09:15:00Z',
    published: true
  };

  return (
    <SidebarLayout>
      <div className="p-8 max-w-4xl mx-auto">
        {/* Navigation */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" asChild>
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">{sectionData.title}</h1>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Updated {new Date(sectionData.updatedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Safety Team</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <SectionCard
          title={sectionData.title}
          type={sectionData.type}
          content={sectionData.content}
          updatedAt={sectionData.updatedAt}
          published={sectionData.published}
        />
      </div>
    </SidebarLayout>
  );
}