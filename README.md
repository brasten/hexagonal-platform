# Hexagonal Architecture #

This is an example repository demonstration one way of building an application
with hexagonal architecture.

It will also eventually serve as an application skeleton for spinning up
ideas quickly.

```
    ┌────────────────┐                                                   
    │ API Definition │                                                   
    └────────────────┘                                                   
            ▲                                                           
            │                                                           
        implements                                                       
            │                                                           
            │          ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
    ┌───────────────┐                                                   
    │  Application  │  │          ┌─ Domain ─────────────┐             │
    └───────────────┘             │                      │              
            │          │          │  Services, etc.      │             │
            │                     │                      │              
            │          │          │ ┌────┐ ┌────┐ ┌────┐ │             │
        bootstraps                │ │Port│ │Port│ │Port│ │              
            │          │          └─┴────┴─┴────┴─┴────┴─┘             │
            └─────────▶                ▲      ▲      ▲                  
                       │               │      └───┐  └─────┐           │
                                  implements      │        │            
                       │               │          │        │           │
                                ┌────────────┐ ┌ ─ ─ ┐  ┌ ─ ─ ┐         
                       │        │  Adapter   │   ...      ...          │
                                │  (mongodb) │ │     │  │     │         
                       │        └────────────┘  ─ ─ ─    ─ ─ ─         │
                                                                       
                       └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘
```