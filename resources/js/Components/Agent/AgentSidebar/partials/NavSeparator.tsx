export default function NavSeparator({ name }: { name: any }){
    return (
        <div className={" mt-2 border-t border-red-950/60 pl-[20px]"}>
            <span className="uppercase text-[9px] font-[500] tracking-[0.5px]  text-slate-400">
                {name}
            </span>
        </div>
    );
};
